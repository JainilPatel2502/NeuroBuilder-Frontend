import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NNProvider } from "./context/NNProvider";
import NetBuilder from "./NetBuilder.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { DataProvider } from "./context/DataProvider.jsx";

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/model", Component: NetBuilder },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NNProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </NNProvider>
  </StrictMode>
);
