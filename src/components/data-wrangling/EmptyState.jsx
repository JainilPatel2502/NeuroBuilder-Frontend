import React from "react";

export default function EmptyState({ onCreateProject }) {
  return (
    <section className="bg-black rounded-xl border border-[#222] p-12 text-center">
      <div className="mx-auto mb-4 h-16 w-16 rounded-full border border-[#333] flex items-center justify-center text-zinc-400 text-2xl">⌂</div>
      <h3 className="text-xl font-bold text-zinc-200">Select a Project</h3>
      <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
        Choose a project from the sidebar to begin exploring your data.
      </p>
      <button className="mt-6 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200"
        onClick={onCreateProject}>Create New Project</button>
    </section>
  );
}
