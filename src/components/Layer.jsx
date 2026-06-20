import Counter from "./Counter";
import Box from "./Box";
import { useEffect, useState } from "react";
import "./main.css";
import RightClick from "./RightClick";
import React from "react";
function Layer({
  setNeuronsPerLayer,
  index,
  setActivationsPerLayer,
  setInitializationPerLayer,
  maxNeuron,
  disabledActivations = new Set(),
}) {
  const [neurons, setNeurons] = useState(1);
  const [activationFunction, setActivationFunction] = useState("ReLU");
  const [intialization, setInitialization] = useState("Normalized");
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleActivationSelect = (func) => {
    setActivationFunction(func);
    setToastMessage("Activation function  selected for layer ");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    // Calculate position relative to the viewport
    const x = e.clientX;
    const y = e.clientY;

    // Ensure the menu doesn't go off-screen (updated for smaller menu)
    const menuWidth = 160; // Updated for smaller menu
    const menuHeight = 220; // Updated for smaller menu

    const adjustedX = x + menuWidth > window.innerWidth ? x - menuWidth : x;
    const adjustedY = y + menuHeight > window.innerHeight ? y - menuHeight : y;

    setMenuPosition({ x: adjustedX, y: adjustedY });
    setShowMenu(true);
  };
  const handleClick = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };
  useEffect(
    function () {
      setNeuronsPerLayer((prev) => {
        const updated = [...prev];
        updated[index] = neurons;
        return updated;
      });
    },
    [neurons, index, setNeuronsPerLayer, intialization, activationFunction],
  );
  useEffect(
    function () {
      setActivationsPerLayer((prev) => {
        const updated = [...prev];
        updated[index] = activationFunction;
        return updated;
      });
    },
    [activationFunction, index, setActivationsPerLayer],
  );

  useEffect(
    function () {
      setInitializationPerLayer((prev) => {
        const updated = [...prev];
        updated[index] = intialization;
        return updated;
      });
    },
    [index, intialization, setInitializationPerLayer],
  );

  return (
    <>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#222] border border-[#444] text-gray-200 px-4 py-2 rounded shadow-2xl text-sm z-50 animate-fade-in-up">
          {toastMessage}
        </div>
      )}
      <div
        onContextMenu={handleRightClick}
        onClick={handleClick}
        className="lay"
      >
        <Box neurons={neurons} maxNeuron={maxNeuron} setNeurons={setNeurons} />
        <RightClick
          menuPosition={menuPosition}
          showMenu={showMenu}
          setActivationFunction={handleActivationSelect}
          setInitialization={setInitialization}
          disabledActivations={disabledActivations}
        />
      </div>
    </>
  );
}

export default Layer;
