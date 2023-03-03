import { createTheme } from '@mui/material';

import { ColorPalette } from './color-palette';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: ColorPalette.primaryColorDark,
      contrastText: ColorPalette.white,
    },
    secondary: {
      main: ColorPalette.primaryColorLight,
      contrastText: ColorPalette.white,
    },
    text: {
      primary: ColorPalette.primaryColorDark,
      secondary: ColorPalette.primaryColorLight,
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {},
});
