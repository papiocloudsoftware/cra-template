import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CurrentUserStateProvider } from "./hooks/use-current-user-state";
import { appTheme } from "./style/theme";

if (process.env.NODE_ENV === "development") {
  const mockServer = require("./service/mock-server").mockServer;
  mockServer();
}

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={appTheme}>
      <CurrentUserStateProvider>
        <App />
      </CurrentUserStateProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
