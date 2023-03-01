import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { BrowserRouter } from "react-router-dom";
import { NotesContextProvider } from "./context/NotesContext";
import "./index.css";
import { FoldersContextProvider } from "./context/FoldersContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FoldersContextProvider>
        <NotesContextProvider>
          <App />
        </NotesContextProvider>
      </FoldersContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
