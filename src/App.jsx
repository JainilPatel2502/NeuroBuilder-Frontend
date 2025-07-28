import { useNavigate } from "react-router";
import { useData } from "./context/DataProvider";
import React from "react";
export default function App() {
  const nav = useNavigate();
  const {
    setFile,
    filename,
    setFilename,
    projects,
    selectedProject,
    setSelectedProject,
    type,
    setType,
    split,
    setSplit,
    batchSize,
    setBatchSize,
    tableData,
    uploadFile,
    setProject,
  } = useData();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Project Uploader</h1>

      {/* Upload Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload New Project</h2>
        <input
          type="text"
          placeholder="Enter filename"
          className="border p-2 mr-2"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
        <input
          type="file"
          className="mr-2"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={uploadFile}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      {/* Project Selection Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Project</h2>
        <select
          className="border p-2 mr-2"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">-- Select Project --</option>
          {projects.map((proj) => (
            <option key={proj} value={proj}>
              {proj}
            </option>
          ))}
        </select>

        <select
          className="border p-2 mr-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="regression">Regression</option>
          <option value="classification">Classification</option>
        </select>

        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Train Split (e.g. 0.8)"
          value={split}
          onChange={(e) => setSplit(e.target.value)}
        />

        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Batch Size"
          value={batchSize}
          onChange={(e) => setBatchSize(e.target.value)}
        />

        <button
          onClick={setProject}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Load Data
        </button>
        <button
          onClick={() => nav("/model")}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          Model
        </button>
      </div>

      {/* Table Display */}
      {tableData.length > 0 && (
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2">
            Sample Data (Top 20 Rows)
          </h2>
          <table className="min-w-full border">
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((col) => (
                  <th key={col} className="border px-2 py-1 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border px-2 py-1">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
