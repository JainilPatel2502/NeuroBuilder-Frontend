import { useNN } from "../context/NNProvider";
import React from "react";
function LayerCounter() {
  const { layer, setLayer } = useNN();
  function handleInc(e) {
    setLayer(Number(e.target.value));
  }
  return (
    <div className="flex items-center bg-black border border-[#333] rounded-lg overflow-hidden backdrop-blur-sm">
      <button
        onClick={() => {
          if (layer < 2) return;
          setLayer(layer - 1);
        }}
        className="px-3 py-2 bg-black hover:bg-black/60 border-r border-[#333] text-zinc-300 font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:text-white"
        disabled={layer <= 1}
      >
        −
      </button>
      <input
        type="number"
        value={layer}
        onChange={handleInc}
        className="px-3 py-2 w-16 text-center bg-black border-0 outline-none text-zinc-200 font-medium focus:bg-black transition-colors duration-200"
        min="1"
      />
      <button
        onClick={() => setLayer(layer + 1)}
        className="px-3 py-2 bg-black hover:bg-black/60 border-l border-[#333] text-zinc-300 font-medium transition-all duration-200 hover:text-white"
      >
        +
      </button>
    </div>
  );
}

export default LayerCounter;
