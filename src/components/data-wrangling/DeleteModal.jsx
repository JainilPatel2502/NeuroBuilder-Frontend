import React from "react";

export default function DeleteModal({ projectName, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#222] bg-black p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-zinc-100">Delete Project</h3>
        <p className="text-sm text-zinc-400 mt-2">
          Permanently delete <span className="text-zinc-200 font-medium">{projectName}</span>? This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg border border-[#333] text-zinc-300 hover:bg-[#111]"
            onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
            onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
