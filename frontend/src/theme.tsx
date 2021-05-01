import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { body: "Montserrat, sans-serif", heading: "Montserrat, sans-serif", mono: `'Menlo', monospace` };

const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
    main: "#FDCD89",
    mainSelected: "#e6a64c",
    upvote: "#FF9900",
    downvote: "#6E51FF",
  },
  fonts,
  breakpoints,
  fontWeights,
});

export default theme;
