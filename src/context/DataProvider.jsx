/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { API_BASE } from "../config";

const handleUnauthorized = () => {
  localStorage.removeItem("neurobuilder_token");
  if (
    window.location.pathname !== "/" &&
    window.location.pathname !== "/login"
  ) {
    window.location.href = "/";
  }
};

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
  const [columns, setColumns] = useState([]);
  const [columnTypes, setColumnTypes] = useState({});
  const [input, setInput] = useState();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = useCallback(async () => {
    try {
      const token = localStorage.getItem("neurobuilder_token");
      if (!token) return;
      const res = await fetch(`${API_BASE}/get_project`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) return handleUnauthorized();
      const data = await res.json();
      setProjects(data.projects);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  }, []);

  const uploadFile = useCallback(async () => {
    if (!file || !filename)
      return { ok: false, error: "Please provide file and filename." };

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", filename);

      const token = localStorage.getItem("neurobuilder_token");
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.status === 401) return handleUnauthorized();

      const data = await res.json();
      if (!res.ok) {
        return { ok: false, error: data.detail || "Upload failed." };
      }

      if (data.ok) {
        await loadProjects();
        return { ok: true };
      }
      return { ok: false, error: "Upload failed." };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }, [file, filename, loadProjects]);

  const loadPreview = useCallback(async (projectName) => {
    if (!projectName) return;
    const token = localStorage.getItem("neurobuilder_token");
    const res = await fetch(`${API_BASE}/data/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ project_name: projectName, limit: 10000 }),
    });
    if (res.status === 401) return handleUnauthorized();
    const data = await res.json();
    if (data.ok) {
      setTableData(data.data);
      setColumns(data.columns || []);
      setColumnTypes(data.column_types || {});
    }
  }, []);

  const setProject = useCallback(async () => {
    try {
      const token = localStorage.getItem("neurobuilder_token");
      const res = await fetch(`${API_BASE}/set_project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          project_name: selectedProject,
          type,
          split,
          batch_size: batchSize,
        }),
      });
      if (res.status === 401) return handleUnauthorized();

      const data = await res.json();
      if (data.ok) {
        setTableData(data.data);
        setInput(data.input_size);
        await loadPreview(selectedProject);
        return { ok: true };
      }
      return { ok: false, error: data.error || "Failed to load dataset." };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }, [batchSize, loadPreview, selectedProject, split, type]);

  const fetchStats = useCallback(
    async (projectName, column, bins = 10, forceType = null) => {
      const payload = { project_name: projectName, column, bins };
      if (forceType) payload.force_type = forceType;
      const token = localStorage.getItem("neurobuilder_token");
      const res = await fetch(`${API_BASE}/data/stats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.status === 401) return handleUnauthorized();
      return res.json();
    },
    [],
  );

  const deleteProject = useCallback(async (projectName) => {
    const token = localStorage.getItem("neurobuilder_token");
    const res = await fetch(`${API_BASE}/data/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ project_name: projectName }),
    });
    if (res.status === 401) return handleUnauthorized();
    return res.json();
  }, []);

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
        columns,
        setColumns,
        columnTypes,
        setColumnTypes,
        uploadFile,
        loadProjects,
        setProject,
        loadPreview,
        fetchStats,
        deleteProject,
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
