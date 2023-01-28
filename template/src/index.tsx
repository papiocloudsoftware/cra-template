import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import { CurrentUserStateProvider } from "./hooks/use-current-user-state";
import { appTheme } from "./style/theme";

if (process.env.NODE_ENV === "development") {
  const mockServer = require("./service/mock-server").mockServer;
  mockServer();
}

const entryPoint = document.getElementById("root");
const root = createRoot(entryPoint!);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={appTheme}>
      <CurrentUserStateProvider>
        <App />
      </CurrentUserStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);
