import React from "react";
function Counter({ neurons, setNeurons }) {
  function handleInc(e) {
    setNeurons(e.target.value);
  }
  return (
    <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={() => {
          if (neurons < 2) return;
          setNeurons(neurons - 1);
        }}
        className="px-3 py-2 bg-white hover:bg-gray-100 border-r border-gray-300 text-gray-700 font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={neurons <= 1}
      >
        −
      </button>
      <input
        type="number"
        value={neurons}
        onChange={handleInc}
        className="px-3 py-2 w-16 text-center bg-white border-0 outline-none text-gray-700 font-medium"
        min="1"
      />
      <button
        onClick={() => setNeurons(neurons + 1)}
        className="px-3 py-2 bg-white hover:bg-gray-100 border-l border-gray-300 text-gray-700 font-medium transition-colors duration-150"
      >
        +
      </button>
    </div>
  );
}

export default Counter;
