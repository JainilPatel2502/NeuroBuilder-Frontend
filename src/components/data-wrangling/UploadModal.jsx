import React from "react";

export default function UploadModal({
  filename,
  setFilename,
  file,
  setFile,
  onClose,
  onUpload,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#222] bg-black p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-zinc-100">Create New Project</h3>
        <p className="text-sm text-zinc-400 mt-1">Upload a CSV file to create a new dataset project.</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Project Name</label>
            <input type="text" placeholder="Enter project name"
              className="w-full px-3 py-2 bg-black border border-[#333] rounded-lg text-sm text-zinc-200 placeholder-zinc-400"
              value={filename} onChange={e => setFilename(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Upload CSV</label>
            <label htmlFor="upload-file"
              className="flex flex-col items-center justify-center border-2 border-dashed border-[#333] rounded-lg px-4 py-6 text-center cursor-pointer hover:border-[#555] transition-colors">
              <span className="text-sm text-zinc-300">{file ? file.name : "Click or drag & drop"}</span>
              <span className="text-xs text-zinc-500 mt-1">CSV files only</span>
            </label>
            <input id="upload-file" type="file" accept=".csv" className="hidden"
              onChange={e => setFile(e.target.files[0])} />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg border border-[#333] text-zinc-300 hover:bg-[#111]"
            onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200"
            onClick={onUpload}>
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}
