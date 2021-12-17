import { createTheme } from '@material-ui/core/styles';

import typography from './typography';
import overrides from './overrides';
import packages from './packages';
import buttons from './buttons';

export const PRIMARY_COLOR_HEX = '#2A0651';
export const PRIMARY_COLOR_RGB = [42, 6, 81];
export const SECONDARY_COLOR_HEX = '#5bed96';
export const SECONDARY_COLOR_RGB = [92, 237, 150];

// Very important: this will not work if the lib versions of core and styles don't match!
// @see: https://spectrum.chat/material-ui/help/muithemeprovider-vs-themeprovider~f6fa2e2b-26d1-45cd-a134-5be0d50ea865
const theme = createTheme({
  /*overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: "#2A0651"
      }
    }
  },*/
  palette: {
    primary: {
      main: PRIMARY_COLOR_HEX,
      mainWithOpacity: (opacity) =>
        `rgba(${PRIMARY_COLOR_RGB.join(',')}, ${opacity})`,
    },
    secondary: {
      main: SECONDARY_COLOR_HEX,
      mainWithOpacity: (opacity) =>
        `rgba(${SECONDARY_COLOR_RGB.join(',')}, ${opacity})`,
    },
  },
  typography,
  overrides,
  packages,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  buttons,
});
// @see: https://material-ui.com/customization/theming/
// TODO: (adriano@20200204) Check if should apply "responsiveFontSizes" to the theme

export default theme;
