import React from "react";

const PAGE_SIZE = 20;

export default function DatasetPreview({
  tableData,
  columns,
  selectedColumn,
  page,
  setPage,
}) {
  if (tableData.length === 0) return null;

  const totalPages = Math.ceil(tableData.length / PAGE_SIZE);
  const pageRows = tableData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="bg-black rounded-xl border border-[#222] p-6 max-w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-zinc-200">
          Dataset Preview
          <span className="ml-2 text-sm font-normal text-zinc-500">
            ({tableData.length} rows · {columns.length} columns)
          </span>
        </h3>
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-[#333] hover:bg-[#111] disabled:opacity-30 transition-colors"
            >←</button>
            <span className="text-zinc-400 min-w-[80px] text-center">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-[#333] hover:bg-[#111] disabled:opacity-30 transition-colors"
            >→</button>
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-max w-max border border-[#222] rounded-lg overflow-hidden text-sm">
          <thead className="bg-[#0d0d0d]">
            <tr>
              {Object.keys(pageRows[0] || {}).map(col => (
                <th key={col}
                  className={`border border-[#222] px-4 py-3 text-left font-semibold whitespace-nowrap
                    ${col === selectedColumn ? "text-emerald-300 bg-emerald-950/30" : "text-zinc-300"}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-black" : "bg-[#080808]"}>
                {Object.values(row).map((val, i) => (
                  <td key={i}
                    className="border border-[#1a1a1a] px-3 py-2 text-zinc-400 whitespace-nowrap font-mono text-xs">
                    {String(val)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Row range info */}
      <p className="text-xs text-zinc-600 mt-3">
        Showing rows {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, tableData.length)} of {tableData.length}
      </p>
    </section>
  );
}
