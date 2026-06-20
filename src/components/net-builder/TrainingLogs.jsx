import React, { useEffect } from "react";

export default function TrainingLogs({ logs }) {
  useEffect(() => {
    const logWindow = document.getElementById("log-window");
    if (logWindow) {
      logWindow.scrollTop = logWindow.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black backdrop-blur-sm rounded-xl shadow-xl border border-[#222] overflow-hidden">
      <div className="bg-black text-zinc-200 px-4 py-3 border-b border-[#333]">
        <h3 className="text-sm font-semibold flex items-center">
          Training Logs
        </h3>
      </div>
      <div
        id="log-window"
        className="h-48 overflow-y-auto bg-black text-emerald-400 p-4 font-mono text-sm"
      >
        {logs.length === 0 ? (
          <div className="text-zinc-500 italic">No logs yet...</div>
        ) : (
          logs.map((log, i) => (
            <pre
              key={i}
              className={`mb-1 whitespace-pre-wrap font-mono ${log && log.includes && log.includes("ERROR") ? "text-red-500 font-bold" : ""}`}
            >
              {log}
            </pre>
          ))
        )}
      </div>
    </div>
  );
}
