import { useEffect, useState } from "react";
import LayerCounter from "./components/LayerCounter";
import NeuralNet from "./components/NeuralNet";
import { useNN } from "./context/NNProvider";
import { useData } from "./context/DataProvider";
import React from "react";

function NetBuilder() {
  const {
    layer,
    nnDetails,
    setNnDetails,
    lr,
    setLr,
    epochs,
    setEpochs,
    lossFn,
    setLossFn,
    optimzer,
    setOptimizer,
    build,
    train,
    logs,
  } = useNN();
  const {
    selectedProject,
    type,
    split,
    batchSize,
    input,
    setFile,
    filename,
    setFilename,
    projects,
    setSelectedProject,
    setType,
    setSplit,
    setBatchSize,
    tableData,
    uploadFile,
    setProject,
  } = useData();

  const [neuronsPerLayer, setNeuronsPerLayer] = useState([]);
  const [actiavtionsPerLayer, setActivationsPerLayer] = useState([]);
  const [initializationPerLayer, setInitializationPerLayer] = useState([]);
  const [regularization, setRegularization] = useState("");
  const [maxNeuron, setMaxNeuron] = useState(0);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [showDataPreview, setShowDataPreview] = useState(false);

  function handlePrintDetails() {
    const neuralnetdet = {
      layers: layer,
      neuronsPerLayer,
      actiavtionsPerLayer,
      initializationPerLayer,
      regularization,
      lr,
      lossFn,
      optimzer,
      epochs,
      input,
    };
    console.log(neuralnetdet);
    setNnDetails(neuralnetdet);
  }
  function makeBody(selectedProject, type, split, batchSize, nndet) {
    const data = {
      project_name: selectedProject,
      type: type,
      split: parseFloat(split),
      batch_size: parseInt(batchSize),
    };
    const model_info = nndet;
    return { data: data, model_info: model_info };
  }

  useEffect(
    function () {
      let max = neuronsPerLayer[0];
      for (let i = 0; i < neuronsPerLayer.length; i++) {
        if (max < neuronsPerLayer[i]) max = neuronsPerLayer[i];
      }
      // Limit the display size calculation to maximum 6 neurons for UI layout
      setMaxNeuron(Math.min(max, 6));
    },
    [neuronsPerLayer, setMaxNeuron]
  );
  useEffect(() => {
    const logWindow = document.getElementById("log-window");
    if (logWindow) {
      logWindow.scrollTop = logWindow.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200">
      {/* Left Collapsible Sidebar for Dataset */}
      <div
        className={`${
          leftSidebarOpen ? "w-80" : "w-12"
        } bg-slate-900 border-r border-slate-800 shadow-xl transition-all duration-300 flex flex-col`}
      >
        {/* Logo and Toggle Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-slate-100 border-b border-slate-700">
          {leftSidebarOpen ? (
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🧠</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-100">
                    NeuroBuilder
                  </h1>
                  <p className="text-slate-400 text-xs">AI Model Designer</p>
                </div>
              </div>
              <button
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                className="p-2 hover:bg-slate-700 rounded-md transition-colors text-slate-300 hover:text-white"
              >
                ←
              </button>
            </div>
          ) : (
            <div className="p-3 flex flex-col items-center">
              <button
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                className="w-6 h-6 bg-slate-700 rounded-md flex items-center justify-center hover:scale-110 transition-transform border border-slate-600"
              >
                <span className="text-lg">🧠</span>
              </button>
              <div className="mt-2 writing-mode-vertical text-xs font-semibold text-slate-400 transform rotate-90 origin-center">
                NB
              </div>
            </div>
          )}
        </div>

        {leftSidebarOpen && (
          <div className="p-4 flex-1 overflow-y-auto bg-slate-900">
            <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center">
              <span className="mr-2">📊</span> Dataset Configuration
            </h3>

            {/* Upload Section */}
            <div className="mb-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
                <span className="mr-2">📁</span> Upload New Dataset
              </h4>
              <input
                type="text"
                placeholder="Enter filename"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg mb-3 text-sm text-slate-200 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
              />
              <input
                type="file"
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg mb-3 text-sm text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-colors"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                onClick={uploadFile}
                className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg text-sm hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
              >
                <span className="mr-2">📤</span> Upload Dataset
              </button>
            </div>

            {/* Project Selection */}
            <div className="mb-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
                <span className="mr-2">🎯</span> Select Dataset
              </h4>
              <select
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg mb-3 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
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
                className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="regression">Regression</option>
                <option value="classification">Classification</option>
              </select>

              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
                placeholder="Train Split (e.g. 0.8)"
                value={split}
                onChange={(e) => setSplit(e.target.value)}
              />

              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
                placeholder="Batch Size"
                value={batchSize}
                onChange={(e) => setBatchSize(e.target.value)}
              />

              <button
                onClick={setProject}
                className="w-full bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition-colors mb-2"
              >
                ✅ Load Data
              </button>

              {tableData.length > 0 && (
                <button
                  onClick={() => setShowDataPreview(!showDataPreview)}
                  className="w-full bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600 transition-colors"
                >
                  👀 {showDataPreview ? "Hide" : "Peek"} Top 20 Rows
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main content area with neural network */}
      <div className="flex-1 p-6 overflow-auto bg-slate-950">
        <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-800 p-6 mb-6">
          <h3 className="text-2xl font-bold text-slate-200 mb-6 flex items-center">
            Neural Network Architecture
          </h3>
          <NeuralNet
            neuronsPerLayer={neuronsPerLayer}
            setNeuronsPerLayer={setNeuronsPerLayer}
            setActivationsPerLayer={setActivationsPerLayer}
            setInitializationPerLayer={setInitializationPerLayer}
            maxNeuron={maxNeuron}
          />
          <div className="mt-6 flex justify-center">
            <LayerCounter />
          </div>
        </div>

        {/* Data Preview Modal/Section */}
        {showDataPreview && tableData.length > 0 && (
          <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-800 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-200 flex items-center">
                <span className="mr-2">📊</span> Dataset Preview (Top 20 Rows)
              </h3>
              <button
                onClick={() => setShowDataPreview(false)}
                className="text-slate-400 hover:text-slate-200 text-xl hover:bg-slate-800 p-2 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-slate-700 rounded-lg overflow-hidden">
                <thead className="bg-slate-800">
                  <tr>
                    {Object.keys(tableData[0]).map((col) => (
                      <th
                        key={col}
                        className="border border-slate-700 px-4 py-3 text-left text-sm font-semibold text-slate-300"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.slice(0, 20).map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {Object.values(row).map((val, i) => (
                        <td
                          key={i}
                          className="border border-gray-200 px-3 py-2 text-sm text-gray-600"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Log window */}
        <div className="bg-slate-900/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-800 overflow-hidden">
          <div className="bg-slate-800 text-slate-200 px-4 py-3 border-b border-slate-700">
            <h3 className="text-sm font-semibold flex items-center">
              <span className="mr-2">📝</span> Training Logs
            </h3>
          </div>
          <div
            id="log-window"
            className="h-48 overflow-y-auto bg-slate-950 text-emerald-400 p-4 font-mono text-sm"
          >
            {logs.length === 0 ? (
              <div className="text-slate-500 italic">No logs yet...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right sidebar with controls */}
      <div className="w-80 bg-slate-900 border-l border-slate-800 shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
            <h3 className="text-xl font-bold text-slate-200">
              Model Configuration
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Learning Rate
              </label>
              <input
                type="number"
                step="0.001"
                placeholder="0.001"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg shadow-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                onChange={(e) => setLr(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Loss Function
              </label>
              <select
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg shadow-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                onChange={(e) => setLossFn(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Loss Function
                </option>
                <option value="Huber">Huber</option>
                <option value="MSE">Mean Squared Error</option>
                <option value="MAE">Mean Absolute Error</option>
                <option value="Categorical Crossentropy">
                  Categorical Crossentropy
                </option>
                <option value="Binary Cross Entropy">
                  Binary Cross Entropy
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Optimizer
              </label>
              <select
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg shadow-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                onChange={(e) => setOptimizer(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Optimizer
                </option>
                <option value="SGD">Stochastic Gradient Descent</option>
                <option value="RMS Prop">RMSprop</option>
                <option value="Adam">Adam</option>
                <option value="AdamW">AdamW</option>
                <option value="Adadelta">Adadelta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Regularization
              </label>
              <select
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg shadow-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                onChange={(e) => setRegularization(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Regularization
                </option>
                <option value="L1">L1 Regularization</option>
                <option value="L2">L2 Regularization</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Epochs
              </label>
              <input
                type="number"
                min="1"
                placeholder="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={epochs}
                onChange={(e) => setEpochs(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              onClick={handlePrintDetails}
            >
              💾 Save Configuration
            </button>
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              onClick={() => build(nnDetails)}
            >
              🔧 Build Model
            </button>
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              onClick={() =>
                train(
                  makeBody(selectedProject, type, split, batchSize, nnDetails)
                )
              }
            >
              🚀 Train Model
            </button>
          </div>

          {/* Status indicators */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Layers:</span>
              <span className="font-medium text-slate-200">{layer}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300 mt-2">
              <span>Total Neurons:</span>
              <span className="font-medium text-slate-200">
                {neuronsPerLayer.reduce(
                  (sum, neurons) => parseInt(sum) + parseInt(neurons),
                  0
                )}
              </span>
            </div>
            {selectedProject && (
              <div className="flex items-center justify-between text-sm text-slate-300 mt-2">
                <span>Dataset:</span>
                <span className="font-medium text-emerald-400">
                  {selectedProject}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetBuilder;
