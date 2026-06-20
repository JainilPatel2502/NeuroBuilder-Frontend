import React from "react";

export default function ConfigForm({
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
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Learning Rate
        </label>
        <input
          type="number"
          step="0.001"
          placeholder="0.001"
          className="w-full px-3 py-2 bg-black border border-[#333] rounded-lg shadow-sm text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#555] focus:border-[#555] transition-colors"
          onChange={(e) => setLr(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Loss Function
          {type && (
            <span className={`ml-2 text-xs font-normal px-1.5 py-0.5 rounded ${
              type === "regression"
                ? "bg-sky-900/50 text-sky-300"
                : "bg-violet-900/50 text-violet-300"
            }`}>
              {type}
            </span>
          )}
        </label>
        <select
          className="w-full px-3 py-2 bg-black border border-[#333] rounded-lg shadow-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#555] focus:border-[#555] transition-colors"
          onChange={(e) => setLossFn(e.target.value)}
          value={lossFn}
        >
          <option value="" disabled>
            Select Loss Function
          </option>
          {[
            { value: "Huber", label: "Huber" },
            { value: "MSE", label: "Mean Squared Error" },
            { value: "MAE", label: "Mean Absolute Error" },
            { value: "Categorical Crossentropy", label: "Categorical Crossentropy" },
            { value: "Binary Cross Entropy", label: "Binary Cross Entropy" },
          ].map(({ value, label }) => {
            const isDisabled = disabledLossFns.has(value);
            return (
              <option
                key={value}
                value={value}
                disabled={isDisabled}
                style={isDisabled ? { color: "#555", fontStyle: "italic" } : {}}
              >
                {isDisabled ? `${label} (not for ${type})` : label}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Optimizer
        </label>
        <select
          className="w-full px-3 py-2 bg-black border border-[#333] rounded-lg shadow-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#555] focus:border-[#555] transition-colors"
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
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Regularization
        </label>
        <select
          className="w-full px-3 py-2 bg-black border border-[#333] rounded-lg shadow-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#555] focus:border-[#555] transition-colors"
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
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Regularization Strength
        </label>
        <input
          type="number"
          min="0"
          step="0.0001"
          placeholder="0.0001"
          className="w-full px-3 py-2 bg-black border border-[#333] rounded-lg shadow-sm text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#555] focus:border-[#555] transition-colors"
          value={regularizationStrength}
          onChange={(e) => setRegularizationStrength(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Epochs
        </label>
        <input
          type="number"
          min="1"
          placeholder="100"
          className="w-full px-3 py-2 border border-[#333] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={epochs}
          onChange={(e) => setEpochs(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
