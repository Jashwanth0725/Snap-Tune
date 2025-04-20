import React from "react";
import ReactDOM from "react-dom/client";
// import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
