import React from "react";

export default function NumericChart({ histogram }) {
  if (!histogram) return null;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-end gap-0.5 h-36 border-b border-l border-[#444] p-2 rounded-tr-lg rounded-br-none bg-[#0a0a0a] relative">
        {histogram.counts.map((count, idx) => {
          const max = Math.max(...histogram.counts, 1);
          const h = Math.max(1, (count / max) * 100);
          return (
            <div key={idx} className="flex-1 bg-emerald-400/70 hover:bg-emerald-400 rounded-sm transition-colors cursor-default"
              style={{ height: `${h}%` }} title={`${count}`} />
          );
        })}
        {/* Y-axis labels */}
        <div className="absolute top-1 -left-1 transform -translate-x-full text-[10px] text-zinc-500 pr-1">
          {Math.max(...histogram.counts)}
        </div>
        <div className="absolute bottom-1 -left-1 transform -translate-x-full text-[10px] text-zinc-500 pr-1">
          0
        </div>
      </div>
      {/* X-axis labels */}
      <div className="flex justify-between text-[10px] text-zinc-400 px-1 pl-4">
        <span>{histogram.bins[0]?.toFixed(2)}</span>
        <span>{histogram.bins[Math.floor(histogram.bins.length / 2)]?.toFixed(2)}</span>
        <span>{histogram.bins[histogram.bins.length - 1]?.toFixed(2)}</span>
      </div>
    </div>
  );
}
