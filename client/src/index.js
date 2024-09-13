import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/output.css";
import './styles/index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AllContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </>
);
