import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Hook from "./components/hooks/hook"; // Assuming Hook contains AuthProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* BrowserRouter must wrap the entire app */}
      <Hook> {/* Your context provider */}
        <App />
      </Hook>
    </BrowserRouter>
  </React.StrictMode>
);
