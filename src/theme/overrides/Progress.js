// ----------------------------------------------------------------------

export default function Progress(theme) {
  const isLight = theme.palette.mode === "light";

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          overflow: "hidden",
        },
        bar: {
          borderRadius: 6,
        },
        colorPrimary: {
          backgroundColor:
            theme.palette.primary[isLight ? "lighter" : "darker"],
        },
        buffer: {
          backgroundColor: "transparent",
        },
      },
    },
  };
}
