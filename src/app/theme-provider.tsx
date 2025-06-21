"use client"
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#555555',
    },
    background: {
      default: '#ffffff',
      paper: '#f0f0f0',
    },
  },
});

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: CustomThemeProviderProps) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}