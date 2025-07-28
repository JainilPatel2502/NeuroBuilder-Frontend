import { useEffect, useState } from "react";
import { useNN } from "../context/NNProvider";
import Layer from "./Layer";
import React from "react";
import "./main.css";
function NeuralNet({
  neuronsPerLayer,
  setNeuronsPerLayer,
  setActivationsPerLayer,
  setInitializationPerLayer,
  setRegularizationPerLayer,
  maxNeuron,
}) {
  const { layer } = useNN();
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const updateConnections = () => {
      const layers = document.querySelectorAll(".lay");

      if (layers.length < 2) return; // Need at least 2 layers for connections

      let newConnections = [];
      for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];
        const currentNeurons = currentLayer.querySelectorAll(".neuron");
        const nextNeurons = nextLayer.querySelectorAll(".neuron");

        currentNeurons.forEach((currNeuron) => {
          const currentRect = currNeuron.getBoundingClientRect();
          const containerRect = document
            .querySelector(".container")
            .getBoundingClientRect();

          // Calculate relative position to the container
          const currentX =
            currentRect.left - containerRect.left + currentRect.width / 2;
          const currentY =
            currentRect.top - containerRect.top + currentRect.height / 2;

          nextNeurons.forEach((nextNeuron) => {
            const nextRect = nextNeuron.getBoundingClientRect();

            // Calculate relative position to the container
            const nextX =
              nextRect.left - containerRect.left + nextRect.width / 2;
            const nextY =
              nextRect.top - containerRect.top + nextRect.height / 2;

            newConnections.push({
              x1: currentX,
              y1: currentY,
              x2: nextX,
              y2: nextY,
            });
          });
        });
      }

      setConnections(newConnections);
    };

    // Use a longer timeout to ensure DOM is fully rendered
    const timeoutId = setTimeout(updateConnections, 100);

    // Also update on window resize and scroll
    const handleResize = () => {
      setTimeout(updateConnections, 100);
    };

    const handleScroll = () => {
      setTimeout(updateConnections, 50);
    };

    const container = document.querySelector(".container");

    window.addEventListener("resize", handleResize);
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [maxNeuron, layer, neuronsPerLayer]);

  return (
    <div className="container">
      <svg className="networksvg">
        {connections.map((line, i) => (
          <line key={i} x1={line.x1} x2={line.x2} y1={line.y1} y2={line.y2} />
        ))}
      </svg>
      {Array.from({ length: layer }, (_, i) => (
        <Layer
          key={i}
          index={i}
          setNeuronsPerLayer={setNeuronsPerLayer}
          setRegularizationPerLayer={setRegularizationPerLayer}
          setActivationsPerLayer={setActivationsPerLayer}
          setInitializationPerLayer={setInitializationPerLayer}
          maxNeuron={maxNeuron}
        />
      ))}
    </div>
  );
}

export default NeuralNet;
