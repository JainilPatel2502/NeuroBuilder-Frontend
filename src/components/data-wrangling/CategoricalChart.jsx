import React from "react";

export default function CategoricalChart({ counts }) {
  if (!counts) return null;

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
      <div className="flex justify-between text-[10px] text-zinc-500 border-b border-[#333] pb-1 mb-2">
        <span>Category</span>
        <span>Count</span>
      </div>
      {counts.labels.slice(0, 15).map((label, idx) => {
        const val = counts.values[idx];
        const max = Math.max(...counts.values, 1);
        const w = Math.max(1, (val / max) * 100);
        return (
          <div key={label} className="text-xs text-zinc-300 flex items-center gap-3">
            <div className="truncate w-1/3 text-right" title={label}>{label}</div>
            <div className="flex-1 flex items-center gap-2 border-l border-[#444] pl-2 py-0.5">
              <div className="h-4 bg-violet-400/80 hover:bg-violet-400 rounded-sm transition-all" style={{ width: `${w}%` }} title={`${val}`} />
              <span className="text-[10px] text-zinc-500">{val}</span>
            </div>
          </div>
        );
      })}
      {/* X-axis labels */}
      <div className="flex justify-between text-[10px] text-zinc-400 border-t border-[#333] pt-1 mt-2 pl-[33%]">
        <span className="ml-2">0</span>
        <span>{Math.max(...counts.values)}</span>
      </div>
    </div>
  );
}
