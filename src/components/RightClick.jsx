import React from "react";
import { createPortal } from "react-dom";

const ACTIVATIONS = [
  { value: "None",      label: "None" },
  { value: "Sigmoid",   label: "Sigmoid" },
  { value: "ReLU",      label: "ReLU" },
  { value: "PReLU",     label: "PReLU" },
  { value: "ELU",       label: "ELU" },
  { value: "TanH",      label: "TanH" },
  { value: "Softmax",   label: "Softmax" },
  { value: "Swish",     label: "Swish" },
  { value: "LeakyReLU", label: "LeakyReLU" },
];

const INITIALIZATIONS = [
  { value: "he",      label: "He Normalization" },
  { value: "xavier",  label: "Xavier" },
];

function RightClick({
  menuPosition,
  showMenu,
  setActivationFunction,
  setInitialization,
  disabledActivations = new Set(),
}) {
  if (!showMenu) return null;

  return createPortal(
    <div
      className="bg-black border border-[#333] rounded-md shadow-2xl z-50 backdrop-blur-sm"
      style={{
        position: "fixed",
        left: menuPosition.x,
        top: menuPosition.y,
        minWidth: "180px",
      }}
    >
      <div className="p-1">
        {/* ── Activation Functions ─────────────────── */}
        <div className="text-xs font-medium text-gray-400 px-2 py-1 border-b border-[#333]">
          Activation Functions
        </div>
        <ul className="py-1">
          {ACTIVATIONS.map(({ value, label }) => {
            const isDisabled = disabledActivations.has(value);
            return (
              <li
                key={value}
                onClick={() => !isDisabled && setActivationFunction(value)}
                className={`px-2 py-1 text-xs flex items-center justify-between transition-colors
                  ${isDisabled
                    ? "text-zinc-600 cursor-not-allowed italic"
                    : "text-gray-300 hover:bg-[#111] hover:text-white cursor-pointer"
                  }`}
                title={isDisabled ? `Not suitable for this problem type` : ""}
              >
                <span>{label}</span>
                {isDisabled && (
                  <span className="ml-2 text-[10px] text-zinc-600 bg-zinc-800/60 px-1 rounded">
                    N/A
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {/* ── Weight Initialization ─────────────────── */}
        <div className="text-xs font-medium text-gray-400 px-2 py-1 border-b border-[#333]">
          Weight Initialization
        </div>
        <ul className="py-1">
          {INITIALIZATIONS.map(({ value, label }) => (
            <li
              key={value}
              onClick={() => setInitialization(value)}
              className="px-2 py-1 text-gray-300 hover:bg-[#111] hover:text-white cursor-pointer transition-colors text-xs"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}

export default RightClick;
