import React from "react";

export default function StatusIndicators({ layer, neuronsPerLayer, selectedProject }) {
  return (
    <div className="mt-6 pt-6 border-t border-[#333]">
      <div className="flex items-center justify-between text-sm text-zinc-300">
        <span>Layers:</span>
        <span className="font-medium text-zinc-200">{layer}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-zinc-300 mt-2">
        <span>Total Neurons:</span>
        <span className="font-medium text-zinc-200">
          {neuronsPerLayer.reduce(
            (sum, neurons) => parseInt(sum) + parseInt(neurons),
            0,
          )}
        </span>
      </div>
      {selectedProject && (
        <div className="flex items-center justify-between text-sm text-zinc-300 mt-2">
          <span>Dataset:</span>
          <span className="font-medium text-emerald-400">
            {selectedProject}
          </span>
        </div>
      )}
      {!selectedProject && (
        <div className="flex items-center justify-between text-sm text-zinc-300 mt-2">
          <span>Dataset:</span>
          <span className="font-medium text-zinc-500">""</span>
        </div>
      )}
    </div>
  );
}
