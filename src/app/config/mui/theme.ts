import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#3761E9",
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#2f2f2f",
      secondary: "#777777",
    },
    divider: "#eeeeee",
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiPaper: {
      defaultProps: {
        sx: {
          border: "none",
        },

        elevation: 0,
      },
    },

    MuiCssBaseline: {
      styleOverrides: `
          body{
            font-family:'poppins' , 'almarai' ;
        }
          `,
    },
  },
  typography: {
    fontFamily: ['"poppins"', '"almarai"'].join(","),
  },
});

export const darkTheme = createTheme({
  direction: "ltr",

  palette: {
    mode: "dark",
    background: {
      default: "#13181F", // الكحلي الغامق
      paper: "#171E27", // الكحلي الكاشف شوي
    },
    text: {
      primary: "#ffffff",
      secondary: "#eeeeee",
    },
    divider: "#373C40", // السطور بين الجداول
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {},
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        sx: {
          border: "none",
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
  },
  typography: {
    ...lightTheme.typography,
  },
});
