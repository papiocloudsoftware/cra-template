import { createTheme } from "@mui/material";

import { ColorPalette } from "./color-palete";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: ColorPalette.primaryColorDark,
      dark: ColorPalette.primaryColorDark
    },
    secondary: { main: ColorPalette.primaryColorLight },
    text: {
      primary: ColorPalette.primaryColorDark,
      secondary: ColorPalette.white
    }
  }
});
