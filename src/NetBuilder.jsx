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
  const { selectedProject, type, split, batchSize, input } = useData();
  const [neuronsPerLayer, setNeuronsPerLayer] = useState([]);
  const [actiavtionsPerLayer, setActivationsPerLayer] = useState([]);
  const [initializationPerLayer, setInitializationPerLayer] = useState([]);
  const [regularization, setRegularization] = useState("");
  const [maxNeuron, setMaxNeuron] = useState(0);

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
      // console.log(max);
      setMaxNeuron(max);
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
    <div>
      <NeuralNet
        neuronsPerLayer={neuronsPerLayer}
        setNeuronsPerLayer={setNeuronsPerLayer}
        setActivationsPerLayer={setActivationsPerLayer}
        setInitializationPerLayer={setInitializationPerLayer}
        maxNeuron={maxNeuron}
      />
      <LayerCounter />
      <div id="top-controls">
        <div className="control">
          <label>Learning Rate</label>
          <input onChange={(e) => setLr(Number(e.target.value))} />
        </div>
        <div className="control">
          <label>Loss Functions</label>
          <select onChange={(e) => setLossFn(e.target.value)} defaultValue="">
            <option value="" disabled>
              Select Loss Function
            </option>
            <option value="Huber">Huber</option>
            <option value="MSE">MSE</option>
            <option value="MAE">MAE</option>
            <option value="Categorical Crossentropy">
              Categorical Crossentropy
            </option>
            <option value="Binary Cross Entropy">Binary Cross Entropy</option>
          </select>
        </div>
        <div className="control">
          <label>Optimizers</label>
          <select onChange={(e) => setOptimizer(e.target.value)}>
            <option value="" disabled>
              Select Optimzer
            </option>
            <option value="SGD">SGD</option>
            <option value="RMS Prop">RMS Prop</option>
            <option value="Adam">Adam</option>
            <option value="AdamW">AdamW </option>
            <option value="Adadelta">Adadelta</option>
          </select>
        </div>

        <div className="control">
          <label>Regularizer</label>
          <select onChange={(e) => setRegularization(e.target.value)}>
            <option value="" disabled>
              Select Regularizer
            </option>
            <option value="L1">L1 Regularization</option>
            <option value="L2">L2 Regularization</option>
          </select>
        </div>

        <div className="control">
          <label>Epochs</label>

          <input
            value={epochs}
            onChange={(e) => setEpochs(Number(e.target.value))}
          />
        </div>
        <button className="but" onClick={handlePrintDetails}>
          Save Details
        </button>
        <button className="but" onClick={() => build(nnDetails)}>
          build
        </button>
        <button
          className="but"
          onClick={() =>
            train(makeBody(selectedProject, type, split, batchSize, nnDetails))
          }
        >
          Train
        </button>
      </div>
      <div
        id="log-window"
        style={{
          height: "200px",
          overflowY: "auto",
          backgroundColor: "#171212ff",
          color: "#f2f2f2",
          padding: "10px",
          marginTop: "1rem",
          fontFamily: "monospace",
          border: "1px solid #444",
        }}
      >
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}

export default NetBuilder;
