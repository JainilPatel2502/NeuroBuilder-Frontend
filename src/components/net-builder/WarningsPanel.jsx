import React from "react";

export default function WarningsPanel({ warnings }) {
  if (warnings.length === 0) return null;

  return (
    <div className="bg-amber-900/40 border border-amber-600 text-amber-200 px-4 py-3 rounded-lg text-sm shadow-lg">
      <div className="font-semibold mb-1">Missing required settings</div>
      <ul className="list-disc list-inside space-y-1">
        {warnings.map((warning) => (
          <li key={warning}>{warning}</li>
        ))}
      </ul>
    </div>
  );
}
