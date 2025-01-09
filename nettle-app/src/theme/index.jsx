const theme = {
  fontFamily: "Inter, sans serif",
  fontFeatureSettings: "clig off liga off",
  fontSizes: {
    xs: "0.6rem",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "24px",
  },
  headings: {
    sizes: {
      h1: {
        fontWeight: 600,
        marginBottom: "20px !important",
        fontSize: "2.125rem",
        lineHeight: 1,
      },
      h2: { fontSize: "1.875rem", lineHeight: 1.067 },
      h3: { fontSize: "1.5rem", lineHeight: 1.083 },
      h4: { fontSize: "1.25rem", lineHeight: 1.1, fontWeight: 500 },
      h5: { fontSize: "1.125rem", lineHeight: 1.111, fontWeight: 500 },
      h6: { fontWeight: 900, lineHeight: 1.125 },
    },
  },
  colors: {
    black: ["#000", "#4F5458", "#16293D", "#D0D0D0", "#D0D0D0", "#242424"],
    grey: ["#B2BAC2", "#B2BAC2", "#667585", "#B9B9B9", "F6F6F6", "#F2F4F7"],
    white: ["#FFF", "#FFF9F2"],
    purple: ["#673692", "#FFF9F2"],
    orange: ["FF8B03", "#F1C14E", "#B26500", "#FFD699", "#FFEBCC"],
    green: [
      "#4CD964",
      "#43C64E",
      "#72D47A",
      "#A1E2A7",
      "#E7EDE9",
      "#242424",
      "#0BBF23",
    ],
    blue: ["#0056B0", "#0056B0", "#EBF5FF", "#B2D8FF", "#2C7EF1", "#D5EAFF"],
    danger: ["#E31B23"],
  },
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
};
export default theme;
