import React from "react";

export default function ActionButtons({
  isTraining,
  stopTraining,
  onBuild,
  onTrain,
  onDataWrangling,
}) {
  return (
    <div className="mt-8 space-y-3 relative">
      <button
        className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-lg text-sm hover:bg-[#222] transition-colors font-medium flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={onBuild}
        disabled={isTraining}
      >
        Build Model
      </button>

      {/* Train / spinner+stop row */}
      {isTraining ? (
        <div className="flex items-center gap-3">
          {/* Spinner + label */}
          <div className="flex-1 flex items-center gap-3 bg-[#0d1117] border border-[#333] px-4 py-3 rounded-lg">
            <svg
              className="animate-spin h-5 w-5 text-emerald-400 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span className="text-emerald-400 text-sm font-medium tracking-wide">
              Training…
            </span>
          </div>

          {/* Red stop button */}
          <button
            onClick={stopTraining}
            title="Stop training"
            className="
              group relative flex items-center justify-center
              w-12 h-12 shrink-0 rounded-full
              bg-red-600 hover:bg-red-500 active:scale-95
              shadow-lg shadow-red-900/50
              transition-all duration-150
            "
          >
            <span className="block w-4 h-4 bg-white rounded-sm" />
            <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-40" />
          </button>
        </div>
      ) : (
        <button
          className="w-full bg-white hover:bg-gray-200 text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200 border border-transparent"
          onClick={onTrain}
        >
          Train Model
        </button>
      )}

      <button
        className="w-full bg-[#111] border border-[#333] text-white px-4 py-3 rounded-lg text-sm hover:bg-[#222] transition-colors font-medium flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={onDataWrangling}
        disabled={isTraining}
      >
        Data Selection
      </button>
    </div>
  );
}
