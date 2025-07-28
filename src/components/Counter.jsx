import React from "react";
function Counter({ neurons, setNeurons }) {
  function handleInc(e) {
    setNeurons(e.target.value);
  }
  return (
    <div className="flex items-center bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
      <button
        onClick={() => {
          if (neurons < 2) return;
          setNeurons(neurons - 1);
        }}
        className="px-3 py-2 bg-slate-900/80 hover:bg-slate-700/60 border-r border-slate-700/50 text-slate-300 font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:text-white"
        disabled={neurons <= 1}
      >
        −
      </button>
      <input
        type="number"
        value={neurons}
        onChange={handleInc}
        className="px-3 py-2 w-16 text-center bg-slate-900/80 border-0 outline-none text-slate-200 font-medium focus:bg-slate-800/80 transition-colors duration-200"
        min="1"
      />
      <button
        onClick={() => setNeurons(neurons + 1)}
        className="px-3 py-2 bg-slate-900/80 hover:bg-slate-700/60 border-l border-slate-700/50 text-slate-300 font-medium transition-all duration-200 hover:text-white"
      >
        +
      </button>
    </div>
  );
}

export default Counter;
