import React from "react";
import NumericChart from "./NumericChart";
import CategoricalChart from "./CategoricalChart";

export default function ColumnExplorer({
  columns,
  columnTypes,
  selectedColumn,
  setSelectedColumn,
  colTypeOverride,
  setColTypeOverride,
  statsType,
  stats,
  histogram,
  counts,
  bins,
  setBins,
}) {
  const effectiveType = selectedColumn
    ? (colTypeOverride[selectedColumn] ?? columnTypes[selectedColumn] ?? "numeric")
    : null;
  const isNumerical = effectiveType === "numeric";

  return (
    <section className="bg-black rounded-xl border border-[#222] p-6">
      <h3 className="text-lg font-bold text-zinc-200 mb-4">Column Explorer</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left: column picker */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Column</label>
            <select className="w-full px-3 py-2 bg-black border border-[#333] rounded-lg text-zinc-200"
              value={selectedColumn} onChange={e => setSelectedColumn(e.target.value)}>
              <option value="" disabled>Select a column</option>
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          {selectedColumn && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">Detected type:</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border
                  ${columnTypes[selectedColumn] === "numeric"
                    ? "text-sky-300 border-sky-700/50 bg-sky-900/20"
                    : "text-violet-300 border-violet-700/50 bg-violet-900/20"}`}>
                  {columnTypes[selectedColumn] || "unknown"}
                </span>
              </div>

              {/* Numerical ↔ Categorical toggle */}
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-sm font-medium transition-colors ${isNumerical ? "text-sky-300" : "text-zinc-500"}`}>
                  Numerical
                </span>
                <button
                  onClick={() => {
                    const next = isNumerical ? "categorical" : "numeric";
                    setColTypeOverride(prev => ({ ...prev, [selectedColumn]: next }));
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none
                    ${isNumerical ? "bg-sky-600" : "bg-violet-600"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
                    ${isNumerical ? "left-1" : "left-7"}`}
                  />
                </button>
                <span className={`text-sm font-medium transition-colors ${!isNumerical ? "text-violet-300" : "text-zinc-500"}`}>
                  Categorical
                </span>
              </div>
            </div>
          )}

          {statsType === "numeric" && stats && (
            <div className="grid grid-cols-2 gap-2">
              {[["Mean", stats.mean], ["Median", stats.median], ["Std", stats.std], ["Min", stats.min], ["Max", stats.max], ["Missing", stats.missing]].map(([label, val]) => (
                <div key={label} className="bg-[#0d0d0d] border border-[#222] rounded-lg px-3 py-2">
                  <div className="text-xs text-zinc-500">{label}</div>
                  <div className="text-sm font-medium text-zinc-200">
                    {typeof val === "number" && !Number.isInteger(val) ? val.toFixed(4) : val}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: visualization */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-zinc-300">Distribution</h4>
            {statsType === "numeric" && (
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>Bins</span>
                <input type="number" min="5" max="50"
                  className="w-16 px-2 py-1 bg-black border border-[#333] rounded text-zinc-200"
                  value={bins} onChange={e => setBins(Number(e.target.value))} />
              </div>
            )}
          </div>

          {!selectedColumn && (
            <div className="h-32 flex items-center justify-center text-zinc-600 text-sm">
              Select a column to see its distribution
            </div>
          )}

          {statsType === "numeric" && <NumericChart histogram={histogram} />}
          {statsType === "categorical" && <CategoricalChart counts={counts} />}
        </div>
      </div>
    </section>
  );
}
