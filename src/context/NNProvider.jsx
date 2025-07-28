/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import React, { StrictMode } from "react";

const API_BASE = "http://localhost:8000";
const NNContext = createContext();
function NNProvider({ children }) {
  const [layer, setLayer] = useState(1);
  const [nnDetails, setNnDetails] = useState({});
  const [data, setData] = useState([]);
  const [lr, setLr] = useState(0.1);
  const [lossFn, setLossFn] = useState("");
  const [optimzer, setOptimizer] = useState("");
  const [epochs, setEpochs] = useState(100);
  const [logs, setLogs] = useState([]);
  // const [lossArrays,setLossArrays] = useState({});

  // async function train(body) {
  //   console.log(body);
  //   const res = await fetch(`${API_BASE}/train`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body),
  //   });
  //   console.log(res);
  // }

  async function train(body) {
    const socket = new WebSocket("ws://localhost:8000/ws/train");

    socket.onopen = () => {
      console.log("🔌 WebSocket connection opened");
      socket.send(JSON.stringify(body));
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
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
        // Optional: append to logs or graph series
      }
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  async function build(nnDetails) {
    try {
      console.log(nnDetails);
      const res = await fetch(`${API_BASE}/build_model`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nnDetails),
      });

      const data = await res.json();
      console.log("✅ Server response:", data);
    } catch (error) {
      console.error("❌ Error sending model data:", error);
    }
  }

  return (
    <NNContext.Provider
      value={{
        epochs,
        setEpochs,
        optimzer,
        setOptimizer,
        lr,
        setLr,
        data,
        setData,
        layer,
        setLayer,
        nnDetails,
        setNnDetails,
        lossFn,
        setLossFn,
        build,
        train,
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
