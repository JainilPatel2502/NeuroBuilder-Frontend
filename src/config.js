// Central configuration for Backend API base URLs
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://api-neurobuilder.jainilpatel.dev";

// Generate WebSocket base URL dynamically by replacing http/https with ws/wss
export const WS_BASE = API_BASE.replace(/^http/, "ws");
