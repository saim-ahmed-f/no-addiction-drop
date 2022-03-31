import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#2D6540", //'#FAACA8',
    },
    secondary: {
      main: '#1a1a1a',
      light  : "#f9f9f9",
    },
    error: {
      main: red.A400,
    },
  },
  typography : {
    fontFamily : "Ubuntu"
  }
});

export default theme;