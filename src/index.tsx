import './assets/styles.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
const theme = createTheme({
  palette: {
    // Removed invalid 'blue' property
    primary: {
      main: '#ffffff',
    },

    secondary: {
      main: '#f2f2f2',
    },
  },
  colorSchemes: {},
});

const root = createRoot(document.body);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
