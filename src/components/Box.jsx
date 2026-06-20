import Neuron from "./Neuron";
import "./main.css";
import React from "react";
import Counter from "./Counter";

function Box({ neurons, maxNeuron, setNeurons }) {
  // Limit the display to maximum 6 neurons, but keep full state management
  const displayedNeurons = Math.min(neurons, 6);
  const hasMoreNeurons = neurons > 6;

  return (
    <div
      style={{
        height: `${maxNeuron * 90}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "60px", /* Ensures space for the counter above the tallest potential box */
      }}
    >
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ position: "absolute", bottom: "100%", paddingBottom: "15px" }}>
          <Counter neurons={neurons} setNeurons={setNeurons} />
        </div>
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
    </div>
  );
}

export default Box;

