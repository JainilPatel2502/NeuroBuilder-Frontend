import React from "react";

export default function DatasetSettings({
  type,
  setType,
  split,
  setSplit,
  batchSize,
  setBatchSize,
  onLoadData,
}) {
  return (
    <section className="bg-black rounded-xl border border-[#222] p-6">
      <h3 className="text-lg font-bold text-zinc-200 mb-4">Dataset Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select className="w-full p-3 bg-black border border-[#333] rounded-lg text-sm text-white"
          value={type} onChange={e => setType(e.target.value)}>
          <option value="regression">Regression</option>
          <option value="classification">Classification</option>
        </select>
        <input type="text" className="w-full p-3 bg-black border border-[#333] text-white rounded-lg text-sm"
          placeholder="Train split (e.g. 0.8)" value={split} onChange={e => setSplit(e.target.value)} />
        <input type="text" className="w-full p-3 bg-black border border-[#333] text-white rounded-lg text-sm"
          placeholder="Batch size" value={batchSize} onChange={e => setBatchSize(e.target.value)} />
        <button onClick={onLoadData}
          className="w-full bg-white text-black font-medium px-4 py-3 rounded-lg text-sm hover:bg-gray-200 transition-colors">
          Load Data
        </button>
      </div>
    </section>
  );
}
