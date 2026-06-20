import React from "react";

export default function Sidebar({
  projects,
  selectedProject,
  setSelectedProject,
  onNewProject,
  onDeleteProject,
}) {
  return (
    <aside className="w-64 border-r border-[#222] bg-black p-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-zinc-100">Projects</h2>
          <p className="text-xs text-zinc-400">Data dashboard</p>
        </div>
        <button
          className="w-8 h-8 rounded-full border border-[#333] text-white hover:bg-[#111] transition-colors"
          onClick={onNewProject}
          title="New project"
        >+</button>
      </div>

      <div className="space-y-1 flex-1 overflow-y-auto">
        {projects.length === 0 && (
          <div className="text-xs text-zinc-500 px-2">No projects yet</div>
        )}
        {projects.map(proj => (
          <div key={proj}
            onClick={() => setSelectedProject(proj)}
            className={`flex items-center justify-between px-3 py-2 rounded-md text-sm border cursor-pointer
              ${selectedProject === proj
                ? "border-emerald-500/60 bg-[#111] text-emerald-300"
                : "border-transparent text-zinc-300 hover:bg-[#111]"}`}
          >
            <div className="flex-1 text-left truncate">{proj}</div>
            <button className="ml-2 text-zinc-500 hover:text-red-400 transition-colors shrink-0"
              title="Delete" onClick={e => { e.stopPropagation(); onDeleteProject(proj); }}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
