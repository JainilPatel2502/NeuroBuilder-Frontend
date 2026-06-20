import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthPage from "./AuthPage.jsx";
import { NNProvider } from "./context/NNProvider";
import NetBuilder from "./NetBuilder.jsx";
import DataWrangling from "./DataWrangling.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { DataProvider } from "./context/DataProvider.jsx";

const router = createBrowserRouter([
  { path: "/", Component: AuthPage },
  { path: "/login", Component: AuthPage },
  { path: "/model", Component: NetBuilder },
  { path: "/data-wrangling", Component: DataWrangling },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NNProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </NNProvider>
  </StrictMode>,
);
