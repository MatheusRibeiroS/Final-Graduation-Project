import createTheme from "@mui/material/styles/createTheme";
import { createContext, useContext, useMemo, useState } from "react";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function setColorModeContext() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  console.log("mode", mode)

  return { theme, colorMode }
}

export function getColorModeContext() {
  return ColorModeContext;
}