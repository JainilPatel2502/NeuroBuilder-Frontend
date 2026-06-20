import { useEffect, useMemo, useState } from "react";
import { useNN } from "./context/NNProvider";
import { useData } from "./context/DataProvider";
import { useNavigate } from "react-router";
import React from "react";

import NNArchitecturePanel from "./components/net-builder/NNArchitecturePanel";
import TrainingLogs from "./components/net-builder/TrainingLogs";
import ModelConfigSidebar from "./components/net-builder/ModelConfigSidebar";

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
    optimizer,
    setOptimizer,
    build,
    train,
    logs,
    neuronsPerLayer,
    setNeuronsPerLayer,
    activationsPerLayer,
    setActivationsPerLayer,
    initializationPerLayer,
    setInitializationPerLayer,
    isTraining,
    stopTraining,
  } = useNN();
  const { selectedProject, type, split, batchSize, input } = useData();

  const nav = useNavigate();
  const [regularization, setRegularization] = useState("");
  const [regularizationStrength, setRegularizationStrength] = useState(0.0001);
  const [maxNeuron, setMaxNeuron] = useState(0);
  const [warnings, setWarnings] = useState([]);

  // ─── Constraint maps ───────────────────────────────────────────────────────
  // Maps each problem type → the set of loss functions that are NOT valid.
  const LOSS_CONSTRAINTS = {
    regression: new Set(["Categorical Crossentropy", "Binary Cross Entropy"]),
    classification: new Set(["Huber", "MSE", "MAE"]),
  };

  // Maps each problem type → activations that are NOT valid on ANY layer.
  const ACTIVATION_CONSTRAINTS = {
    regression: new Set(["Softmax"]),       // Softmax makes no sense for regression output
    classification: new Set([]),             // all activations valid for classification
  };

  const disabledLossFns = useMemo(
    () => LOSS_CONSTRAINTS[type] ?? new Set(),
    [type]
  );

  const disabledActivations = useMemo(
    () => ACTIVATION_CONSTRAINTS[type] ?? new Set(),
    [type]
  );

  // Reset lossFn whenever the problem type changes and the current selection
  // is no longer valid for the new type.
  useEffect(() => {
    if (lossFn && disabledLossFns.has(lossFn)) {
      setLossFn("");
    }
  }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  function buildModelConfig() {
    return {
      layers: layer,
      neuronsPerLayer,
      activationsPerLayer,
      initializationPerLayer,
      regularization,
      regularizationStrength,
      lr,
      lossFn,
      optimizer,
      epochs,
      input,
    };
  }

  function makeBody(selectedProject, type, split, batchSize, nndet) {
    const data = {
      project_name: selectedProject,
      type: type,
      split: parseFloat(split),
      batch_size: parseInt(batchSize),
    };
    return { data: data, model_info: nndet };
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
    [neuronsPerLayer, setMaxNeuron],
  );

  // Layer trimming is now handled atomically inside setLayer() in NNProvider.

  function validateConfig() {
    const issues = [];
    if (!selectedProject) issues.push("Select a dataset before training.");
    if (!type) issues.push("Select a problem type.");
    if (!split) issues.push("Set the train split.");
    if (!batchSize) issues.push("Set the batch size.");
    if (!lossFn) issues.push("Select a loss function.");
    if (!optimizer) issues.push("Select an optimizer.");
    if (!lr) issues.push("Set a learning rate.");
    if (!epochs) issues.push("Set the number of epochs.");
    if (!neuronsPerLayer.length) issues.push("Add at least one layer.");
    if (!activationsPerLayer.length) issues.push("Select activations for layers.");
    if (!initializationPerLayer.length) issues.push("Select initializations for layers.");
    if (!input) issues.push("Dataset not loaded. Go to Data Wrangling and click 'Load Data'.");
    setWarnings(issues);
    return issues.length === 0;
  }

  async function handleBuild() {
    if (!validateConfig()) return;
    const config = buildModelConfig();
    setNnDetails(config);
    await build(config);
  }

  async function handleTrain() {
    if (!validateConfig()) return;
    const config = buildModelConfig();
    setNnDetails(config);
    train(makeBody(selectedProject, type, split, batchSize, config));
  }

  return (
    <div className="flex h-screen bg-black text-zinc-200">
      <div className="flex-1 p-6 overflow-auto bg-black">
        <NNArchitecturePanel
          neuronsPerLayer={neuronsPerLayer}
          setNeuronsPerLayer={setNeuronsPerLayer}
          setActivationsPerLayer={setActivationsPerLayer}
          setInitializationPerLayer={setInitializationPerLayer}
          maxNeuron={maxNeuron}
          disabledActivations={disabledActivations}
          onLogout={() => { localStorage.removeItem("neurobuilder_token"); nav("/login"); }}
        />
        <TrainingLogs logs={logs} />
      </div>

      <ModelConfigSidebar
        lr={lr} setLr={setLr}
        lossFn={lossFn} setLossFn={setLossFn}
        optimizer={optimizer} setOptimizer={setOptimizer}
        regularization={regularization} setRegularization={setRegularization}
        regularizationStrength={regularizationStrength} setRegularizationStrength={setRegularizationStrength}
        epochs={epochs} setEpochs={setEpochs}
        type={type}
        disabledLossFns={disabledLossFns}
        warnings={warnings}
        isTraining={isTraining}
        stopTraining={stopTraining}
        onBuild={handleBuild}
        onTrain={handleTrain}
        onDataWrangling={() => nav("/data-wrangling")}
        layer={layer}
        neuronsPerLayer={neuronsPerLayer}
        selectedProject={selectedProject}
      />
    </div>
  );
}

export default NetBuilder;
