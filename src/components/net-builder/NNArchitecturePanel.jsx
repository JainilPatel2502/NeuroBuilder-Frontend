import React from "react";
import NeuralNet from "../NeuralNet";
import LayerCounter from "../LayerCounter";

export default function NNArchitecturePanel({
  neuronsPerLayer,
  setNeuronsPerLayer,
  setActivationsPerLayer,
  setInitializationPerLayer,
  maxNeuron,
  disabledActivations,
  onLogout,
}) {
  return (
    <div className="bg-black backdrop-blur-sm rounded-xl shadow-xl border border-[#222] p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold text-zinc-200 flex items-center" style={{ fontFamily: "'Pacifico', cursive" }}>
          Neural Net Playground
        </h3>
        <button
          className="text-zinc-400 hover:text-white text-sm transition-colors"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
      <NeuralNet
        neuronsPerLayer={neuronsPerLayer}
        setNeuronsPerLayer={setNeuronsPerLayer}
        setActivationsPerLayer={setActivationsPerLayer}
        setInitializationPerLayer={setInitializationPerLayer}
        maxNeuron={maxNeuron}
        disabledActivations={disabledActivations}
      />
      <div className="mt-6 flex justify-center">
        <LayerCounter />
      </div>
    </div>
  );
}
