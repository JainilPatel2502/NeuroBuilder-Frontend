import { useEffect, useState } from "react";
import { useData } from "./context/DataProvider";
import { useNavigate } from "react-router";
import React from "react";

import Sidebar from "./components/data-wrangling/Sidebar";
import UploadModal from "./components/data-wrangling/UploadModal";
import DeleteModal from "./components/data-wrangling/DeleteModal";
import DatasetSettings from "./components/data-wrangling/DatasetSettings";
import EmptyState from "./components/data-wrangling/EmptyState";
import ColumnExplorer from "./components/data-wrangling/ColumnExplorer";
import DatasetPreview from "./components/data-wrangling/DatasetPreview";
import Toast from "./components/data-wrangling/Toast";

function DataWrangling() {
  const nav = useNavigate();
  const {
    selectedProject, type, split, batchSize,
    file, setFile, filename, setFilename,
    projects, setSelectedProject, setType, setSplit, setBatchSize,
    tableData, setTableData, columns, setColumns, columnTypes, setColumnTypes,
    uploadFile, loadProjects, setProject, loadPreview, fetchStats, deleteProject,
  } = useData();

  const [selectedColumn, setSelectedColumn] = useState("");
  const [statsType, setStatsType]           = useState("");
  const [stats, setStats]                   = useState(null);
  const [histogram, setHistogram]           = useState(null);
  const [counts, setCounts]                 = useState(null);
  const [bins, setBins]                     = useState(10);
  const [colTypeOverride, setColTypeOverride] = useState({});
  const [page, setPage]                     = useState(1);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState("");
  const [toast, setToast]                   = useState(null);

  function triggerToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Ensure projects are loaded when this page is visited
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Reset column selection when project data changes
  useEffect(() => {
    if (selectedColumn && !columns.includes(selectedColumn)) {
      setSelectedColumn(""); setStatsType(""); setStats(null);
      setHistogram(null); setCounts(null);
    }
  }, [columns, selectedColumn]);

  // Load column stats
  useEffect(() => {
    async function loadStats() {
      if (!selectedProject || !selectedColumn) return;
      const override = colTypeOverride[selectedColumn] || null;
      const data = await fetchStats(selectedProject, selectedColumn, bins, override);
      if (!data.ok) return;
      setStatsType(data.type || "");
      setStats(data.stats || null);
      setHistogram(data.histogram || null);
      setCounts(data.counts || null);
    }
    loadStats();
  }, [selectedProject, selectedColumn, bins, fetchStats, colTypeOverride]);

  // Load preview when project changes
  useEffect(() => {
    if (!selectedProject) { setTableData([]); setColumns([]); setColumnTypes({}); return; }
    setPage(1);
    loadPreview(selectedProject);
  }, [selectedProject, loadPreview]);

  async function handleLoadData() {
    if (!selectedProject) { triggerToast("Please select a project first.", "error"); return; }
    const result = await setProject();
    if (result?.ok) triggerToast(`Dataset "${selectedProject}" loaded successfully!`);
    else triggerToast(result?.error || "Failed to load dataset.", "error");
  }

  async function handleUpload() {
    const result = await uploadFile();
    if (result && result.ok) {
      triggerToast("File uploaded successfully!");
      setShowUploadPanel(false);
    } else {
      triggerToast(result?.error || "Failed to upload file", "error");
    }
  }

  async function handleDeleteConfirm() {
    const t = projectToDelete;
    setShowDeleteModal(false);
    setProjectToDelete("");
    const r = await deleteProject(t);
    if (r.ok) {
      if (selectedProject === t) setSelectedProject("");
      await loadProjects();
    }
  }

  return (
    <div className="min-h-screen bg-black text-zinc-200">
      <div className="flex min-h-screen">

        <Sidebar
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          onNewProject={() => setShowUploadPanel(true)}
          onDeleteProject={(proj) => { setProjectToDelete(proj); setShowDeleteModal(true); }}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex items-center justify-between border-b border-[#222] px-6 py-4">
            <div className="flex items-center gap-4">
              
              <h1 className="text-xl font-bold text-zinc-100" style={{ fontFamily: "'Pacifico', cursive" }}>Neural Net Playground</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="text-zinc-400 hover:text-white text-sm transition-colors"
                onClick={() => { localStorage.removeItem("neurobuilder_token"); nav("/login"); }}
              >
                Logout
              </button>
              <button
                className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => nav("/model")} disabled={!selectedProject}
              >Let's Train</button>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6 overflow-auto">
            {showUploadPanel && (
              <UploadModal
                filename={filename} setFilename={setFilename}
                file={file} setFile={setFile}
                onClose={() => setShowUploadPanel(false)}
                onUpload={handleUpload}
              />
            )}

            {showDeleteModal && (
              <DeleteModal
                projectName={projectToDelete}
                onClose={() => { setShowDeleteModal(false); setProjectToDelete(""); }}
                onConfirm={handleDeleteConfirm}
              />
            )}

            <DatasetSettings
              type={type} setType={setType}
              split={split} setSplit={setSplit}
              batchSize={batchSize} setBatchSize={setBatchSize}
              onLoadData={handleLoadData}
            />

            {!selectedProject && (
              <EmptyState onCreateProject={() => setShowUploadPanel(true)} />
            )}

            {selectedProject && (
              <ColumnExplorer
                columns={columns} columnTypes={columnTypes}
                selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn}
                colTypeOverride={colTypeOverride} setColTypeOverride={setColTypeOverride}
                statsType={statsType} stats={stats}
                histogram={histogram} counts={counts}
                bins={bins} setBins={setBins}
              />
            )}

            <DatasetPreview
              tableData={tableData} columns={columns}
              selectedColumn={selectedColumn}
              page={page} setPage={setPage}
            />
          </main>
        </div>
      </div>

      <Toast toast={toast} />
    </div>
  );
}

export default DataWrangling;
