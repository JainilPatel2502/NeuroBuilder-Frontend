import Neuron from "./Neuron";
import "./main.css";
import React from "react";
function Box({ neurons, maxNeuron }) {
  // Limit the display to maximum 6 neurons, but keep full state management
  const displayedNeurons = Math.min(neurons, 6);
  const hasMoreNeurons = neurons > 6;

  return (
    <div
      style={{
        height: `${maxNeuron * 90}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center ",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: displayedNeurons }, (_, index) => (
        <Neuron key={index} />
      ))}
      {hasMoreNeurons && (
        <div
          style={{
            color: "#666",
            fontSize: "12px",
            margin: "10px 0",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          +{neurons - 6} more neurons
        </div>
      )}
    </div>
  );
}

export default Box;
