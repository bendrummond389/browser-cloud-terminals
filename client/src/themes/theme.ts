import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#004B8D',
    },
    secondary: {
      main: '#70C1B3',
    },
    background: {
      default: '#F4F4F4',
    },
    text: {
      primary: '#333333',
      secondary: '#000000',
    },
    error: {
      main: '#FF6B6B',
    },
  },
});

export default theme;