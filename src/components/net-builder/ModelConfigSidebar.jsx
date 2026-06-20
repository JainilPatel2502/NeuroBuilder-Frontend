import React from "react";
import ConfigForm from "./ConfigForm";
import WarningsPanel from "./WarningsPanel";
import ActionButtons from "./ActionButtons";
import StatusIndicators from "./StatusIndicators";

export default function ModelConfigSidebar({
  // ConfigForm props
  lr,
  setLr,
  lossFn,
  setLossFn,
  optimizer,
  setOptimizer,
  regularization,
  setRegularization,
  regularizationStrength,
  setRegularizationStrength,
  epochs,
  setEpochs,
  type,
  disabledLossFns,
  // WarningsPanel props
  warnings,
  // ActionButtons props
  isTraining,
  stopTraining,
  onBuild,
  onTrain,
  onDataWrangling,
  // StatusIndicators props
  layer,
  neuronsPerLayer,
  selectedProject,
}) {
  return (
    <div className="w-80 bg-black border-l border-[#222] shadow-xl overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
          <h3 className="text-xl font-bold text-zinc-200">
            Model Configuration
          </h3>
        </div>

        <ConfigForm
          lr={lr}
          setLr={setLr}
          lossFn={lossFn}
          setLossFn={setLossFn}
          optimizer={optimizer}
          setOptimizer={setOptimizer}
          regularization={regularization}
          setRegularization={setRegularization}
          regularizationStrength={regularizationStrength}
          setRegularizationStrength={setRegularizationStrength}
          epochs={epochs}
          setEpochs={setEpochs}
          type={type}
          disabledLossFns={disabledLossFns}
        />

        <ActionButtons
          isTraining={isTraining}
          stopTraining={stopTraining}
          onBuild={onBuild}
          onTrain={onTrain}
          onDataWrangling={onDataWrangling}
        />

        <WarningsPanel warnings={warnings} />

        <StatusIndicators
          layer={layer}
          neuronsPerLayer={neuronsPerLayer}
          selectedProject={selectedProject}
        />
      </div>
    </div>
  );
}
