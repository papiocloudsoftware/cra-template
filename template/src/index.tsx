import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { CurrentUserStateProvider } from "./hooks/use-current-user-state";
import { DeviceSettingsProvider } from "./hooks/use-device-settings";
import { ModalStateProvider } from "./hooks/use-modal-state";
import { appTheme } from "./style/theme";

const mockServer = require("./service/mock-server").mockServer;
mockServer();

const entryPoint = document.getElementById("root");
const root = createRoot(entryPoint!);
root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={appTheme}>
      <DeviceSettingsProvider>
        <CurrentUserStateProvider>
          <ModalStateProvider>
            <App />
          </ModalStateProvider>
        </CurrentUserStateProvider>
      </DeviceSettingsProvider>
    </ThemeProvider>
  </>
);
