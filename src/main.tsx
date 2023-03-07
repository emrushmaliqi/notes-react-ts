import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { BrowserRouter } from "react-router-dom";
import { NotesContextProvider } from "./context/NotesContext";
import "./index.css";
import { FoldersContextProvider } from "./context/FoldersContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ContextsProvider } from "./context/ContextsProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextsProvider>
        <App />
      </ContextsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
