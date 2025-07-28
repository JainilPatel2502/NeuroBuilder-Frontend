/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";

const API_BASE = "http://localhost:8000";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [type, setType] = useState("regression");
  const [split, setSplit] = useState("0.8");
  const [batchSize, setBatchSize] = useState("32");
  const [tableData, setTableData] = useState([]);
  const [input, setInput] = useState();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/get_project`, { method: "POST" });
      const data = await res.json();
      setProjects(data.pojects);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  };

  const uploadFile = async () => {
    if (!file || !filename) return alert("Please provide file and filename.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);

    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.ok) {
      alert("Uploaded");
      loadProjects();
    }
  };

  const setProject = async () => {
    const res = await fetch(`${API_BASE}/set_project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_name: selectedProject,
        type,
        split,
        batch_size: batchSize,
      }),
    });

    const data = await res.json();
    if (data.ok) {
      setTableData(data.data);
      setInput(data.input_size);
    }
  };

  return (
    <DataContext.Provider
      value={{
        file,
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
        setTableData,
        uploadFile,
        setProject,
        input,
        setInput,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
function useData() {
  const nn = useContext(DataContext);
  if (!nn) throw new Error("Using context from outside");
  return nn;
}

export { DataProvider, useData };
