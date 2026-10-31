import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// Standard React 18 entry point: find #root and render <App /> into it.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
