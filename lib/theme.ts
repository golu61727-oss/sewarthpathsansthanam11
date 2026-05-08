"use client";
import { createTheme } from "@mui/material/styles";
import { orange, green, brown, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E07B39",
      light: "#F5A673",
      dark: "#A8541A",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2D6A4F",
      light: "#52B788",
      dark: "#1B4332",
      contrastText: "#fff",
    },
    background: {
      default: "#FFFBF5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#4A4A4A",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "0.95rem",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #E07B39 0%, #C9920C 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #C9920C 0%, #E07B39 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 8px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default theme;
