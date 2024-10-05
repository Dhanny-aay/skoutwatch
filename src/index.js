import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import ActivePageProvider from "./dashboard/contexts/demoPageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ActivePageProvider>
          <App />
        </ActivePageProvider>
      </SnackbarProvider>
    </Router>
  </React.StrictMode>
);
