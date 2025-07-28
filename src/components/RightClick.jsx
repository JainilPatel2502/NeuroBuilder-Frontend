import React from "react";

function RightClick({
  menuPosition,
  showMenu,
  setActivationFunction,
  setInitialization,
}) {
  if (!showMenu) return null;

  return (
    <div
      className="bg-slate-900 border border-slate-700 rounded-md shadow-xl z-50 backdrop-blur-sm"
      style={{
        position: "fixed",
        left: menuPosition.x,
        top: menuPosition.y,
        minWidth: "160px",
      }}
    >
      <div className="p-1">
        <div className="text-xs font-medium text-slate-400 px-2 py-1 border-b border-slate-700">
          Activation Functions
        </div>
        <ul className="py-1">
          <li
            onClick={() => setActivationFunction("None")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            None
          </li>
          <li
            onClick={() => setActivationFunction("Sigmoid")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            Sigmoid
          </li>
          <li
            onClick={() => setActivationFunction("ReLU")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            ReLU
          </li>
          <li
            onClick={() => setActivationFunction("PReLU")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            PReLU
          </li>
          <li
            onClick={() => setActivationFunction("ELU")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            ELU
          </li>
          <li
            onClick={() => setActivationFunction("TanH")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            TanH
          </li>
          <li
            onClick={() => setActivationFunction("Softmax")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            Softmax
          </li>
          <li
            onClick={() => setActivationFunction("Swish")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            Swish
          </li>
          <li
            onClick={() => setActivationFunction("LeakyReLU")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            LeakyReLU
          </li>
        </ul>
        <div className="text-xs font-medium text-slate-400 px-2 py-1 border-b border-slate-700">
          Weight Initialization
        </div>
        <ul className="py-1">
          <li
            onClick={() => setInitialization("he")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            He Normalization
          </li>
          <li
            onClick={() => setInitialization("xavier")}
            className="px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors text-xs"
          >
            Xavier
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RightClick;
