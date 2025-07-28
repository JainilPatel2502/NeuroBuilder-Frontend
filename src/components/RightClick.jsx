import React from "react";

function RightClick({
  menuPosition,
  showMenu,
  setActivationFunction,
  setInitialization,
}) {
  if (!showMenu) return null;

  return (
    <div
      className="bg-white border border-gray-300 rounded-md shadow-lg z-50"
      style={{
        position: "fixed",
        left: menuPosition.x,
        top: menuPosition.y,
        minWidth: "200px",
      }}
    >
      <ul style={{ listStyleType: "none", margin: 0, padding: "5px" }}>
        <li onClick={() => setActivationFunction("None")}>None</li>
        <li onClick={() => setActivationFunction("Sigmoid")}>Sigmoid</li>
        <li onClick={() => setActivationFunction("ReLU")}>ReLU</li>
        <li onClick={() => setActivationFunction("PReLU")}>PReLU</li>
        <li onClick={() => setActivationFunction("ELU")}>ELU</li>
        <li onClick={() => setActivationFunction("TanH")}>TanH</li>
        <li onClick={() => setActivationFunction("Softmax")}>Softmax</li>
        <li onClick={() => setActivationFunction("Swish")}>Swish</li>
        <li onClick={() => setActivationFunction("LeakyReLU")}>LeakyReLU</li>
        <li onClick={() => setInitialization("he")}>He Normalization</li>
        <li onClick={() => setInitialization("xavier")}>Xavier</li>
      </ul>
    </div>
  );
}

export default RightClick;
