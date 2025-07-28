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
}) {
  const [neurons, setNeurons] = useState(1);
  const [activationFunction, setActivationFunction] = useState("ReLU");
  const [intialization, setInitialization] = useState("Normalized");
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);

  const handleRightClick = (e) => {
    e.preventDefault();

    // Calculate position relative to the viewport
    const x = e.clientX;
    const y = e.clientY;

    // Ensure the menu doesn't go off-screen
    const menuWidth = 200; // Approximate width of context menu
    const menuHeight = 300; // Approximate height of context menu

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
    [neurons, index, setNeuronsPerLayer, intialization, activationFunction]
  );
  useEffect(
    function () {
      setActivationsPerLayer((prev) => {
        const updated = [...prev];
        updated[index] = activationFunction;
        return updated;
      });
    },
    [activationFunction, index, setActivationsPerLayer]
  );

  useEffect(
    function () {
      setInitializationPerLayer((prev) => {
        const updated = [...prev];
        updated[index] = intialization;
        return updated;
      });
    },
    [index, intialization, setInitializationPerLayer]
  );

  return (
    <div onContextMenu={handleRightClick} onClick={handleClick} className="lay">
      <Counter neurons={neurons} setNeurons={setNeurons} />
      <Box neurons={neurons} maxNeuron={maxNeuron} />
      <RightClick
        menuPosition={menuPosition}
        showMenu={showMenu}
        setActivationFunction={setActivationFunction}
        setInitialization={setInitialization}
      />
    </div>
  );
}

export default Layer;
