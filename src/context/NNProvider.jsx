/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import React from "react";
import { API_BASE, WS_BASE } from "../config";

const handleUnauthorized = () => {
  localStorage.removeItem("neurobuilder_token");
  if (
    window.location.pathname !== "/" &&
    window.location.pathname !== "/login"
  ) {
    window.location.href = "/";
  }
};

const NNContext = createContext();

function NNProvider({ children }) {
  const [layer, setLayerRaw] = useState(1);
  const [neuronsPerLayer, setNeuronsPerLayer] = useState([]);
  const [activationsPerLayer, setActivationsPerLayer] = useState([]);
  const [initializationPerLayer, setInitializationPerLayer] = useState([]);

  const [nnDetails, setNnDetails] = useState({});
  const [data, setData] = useState([]);
  const [lr, setLr] = useState(0.1);
  const [lossFn, setLossFn] = useState("");
  const [optimizer, setOptimizer] = useState("");
  const [epochs, setEpochs] = useState(100);
  const [logs, setLogs] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const socketRef = useRef(null); // holds the live WebSocket during training

  /**
   * When the layer count changes we need to resize the per-layer arrays.
   * - Increasing: the new Layer component will push its own defaults via its
   *   useEffect, so we don't need to pre-fill — just leave the arrays as-is
   *   and they'll grow naturally.
   * - Decreasing: drop the tail entries that belong to the removed layers.
   *   We do this HERE in the setter so there is one canonical place that owns
   *   this logic, not a fragile useEffect in a consumer.
   */
  const setLayer = useCallback((newLayerRaw) => {
    const newLayer = Number(newLayerRaw);
    if (isNaN(newLayer) || newLayer < 1) return;

    setLayerRaw(newLayer);

    // Only trim when reducing — when adding, Layer mounts and fills its slot.
    setNeuronsPerLayer((prev) =>
      prev.length > newLayer ? prev.slice(0, newLayer) : prev,
    );
    setActivationsPerLayer((prev) =>
      prev.length > newLayer ? prev.slice(0, newLayer) : prev,
    );
    setInitializationPerLayer((prev) =>
      prev.length > newLayer ? prev.slice(0, newLayer) : prev,
    );
  }, []);

  async function train(body) {
    // Close any existing session before starting a new one
    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = new WebSocket(`${WS_BASE}/ws/train`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("🔌 WebSocket connection opened");
      setIsTraining(true);
      const token = localStorage.getItem("neurobuilder_token") || "";
      socket.send(JSON.stringify({ ...body, token }));
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.error === "Unauthorized") {
        handleUnauthorized();
        return;
      }
      setLogs((prev) => [...prev, msg.message]);
      if (msg.error) {
        console.error("❌ Error:", msg.error);
      } else if (msg.train_losses && msg.test_losses) {
        console.log("✅ Final Loss Arrays");
        console.log("Train Losses:", msg.train_losses);
        console.log("Test Losses:", msg.test_losses);
        setData({ train: msg.train_losses, test: msg.test_losses });
      } else {
        console.log("📊 Epoch:", msg.epoch);
        console.log("Train Loss:", msg.train_loss);
        console.log("Test Loss:", msg.test_loss);
      }
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket connection closed");
      setIsTraining(false);
      socketRef.current = null;
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsTraining(false);
      socketRef.current = null;
    };
  }

  /** Immediately terminate the active training session. */
  function stopTraining() {
    if (socketRef.current) {
      socketRef.current.close();
      // onclose will flip isTraining → false
    }
  }

  async function build(nnDetails) {
    try {
      console.log(nnDetails);
      const token = localStorage.getItem("neurobuilder_token") || "";
      const res = await fetch(`${API_BASE}/build_model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nnDetails),
      });

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        const details = data?.details
          ? JSON.stringify(data.details)
          : data?.error || "Unknown error";
        setLogs((prev) => [...prev, `ERROR: ${details}`]);
        return;
      }
      if (data.model) {
        setLogs((prev) => [...prev, data.model]);
      }
    } catch (error) {
      console.error("❌ Error sending model data:", error);
      setLogs((prev) => [...prev, `ERROR: ${error.message}`]);
    }
  }

  return (
    <NNContext.Provider
      value={{
        epochs,
        setEpochs,
        optimizer,
        setOptimizer,
        lr,
        setLr,
        data,
        setData,
        layer,
        setLayer,
        neuronsPerLayer,
        setNeuronsPerLayer,
        activationsPerLayer,
        setActivationsPerLayer,
        initializationPerLayer,
        setInitializationPerLayer,
        nnDetails,
        setNnDetails,
        lossFn,
        setLossFn,
        build,
        train,
        stopTraining,
        isTraining,
        logs,
      }}
    >
      {children}
    </NNContext.Provider>
  );
}

function useNN() {
  const nn = useContext(NNContext);
  if (!nn) throw new Error("Using context from outside");
  return nn;
}

export { NNProvider, useNN };
