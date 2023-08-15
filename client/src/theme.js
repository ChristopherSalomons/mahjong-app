import { alpha } from "@mui/material";

const colors = {
  darkest: '#181923',
  dark: '#292c3a',
  light: '#9399b8',
  lightest: '#f2f3fa',
  white: 'f9f9f9',
  highlight: '#b93c3c',

  iconHover: '#3e4253',
}

const getTheme = (mode) => ({
  typography: {
    h4: {
      fontWeight: 'bold',
    },
    h5: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
    },
    fontFamily: [
      'Segoe UI',
      'sans-serif',
    ].join(','),
  },
  palette: {
    mode,
    primary: {
      ...(mode === 'light' ? {
        main: colors.dark,
        light: colors.light,
      } : {
        main: colors.dark,
        light: colors.light,
      }),
    },
    secondary: {
      main: colors.highlight,
    },
    background: {
      ...(mode === 'light' ? {
        default: colors.white,
        paper: colors.white,
      } : {
        default: colors.darkest,
        paper: colors.darkest,
      }),
    },
    text: {
      ...(mode === 'light' ? {
        primary: colors.darkest,
        secondary: alpha(colors.darkest, 0.8),
      } : {
        primary: colors.lightest,
        secondary: alpha(colors.lightest, 0.8),
      }),
    },
    action: {
      ...(mode === 'light' ? {
        hover: alpha(colors.light, 0.1)
      } : {
        hover: alpha(colors.light, 0.2)
      }),
    },
    appbar: {
      ...(mode === 'light' ? {
        main: colors.dark,
        text: colors.lightest,
        divider: alpha(colors.light, 0.2),
        hover: alpha(colors.light, 0.2),
        iconHover: colors.iconHover,
      } : {
        main: colors.dark,
        text: colors.lightest,
        divider: alpha(colors.light, 0.2),
        hover: alpha(colors.light, 0.2),
        iconHover: colors.iconHover,
      }),
    },
    ...(mode === 'light' ? {
      divider: alpha(colors.light, 0.5),
    } : {
      divider: colors.dark,
    }),

  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'unset' } },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 650,
      md: 900,
      lg: 1100,
      xl: 1512,
    },
  },
});

export default getTheme;