import React, { ReactNode, useEffect } from 'react';
import { useDarkModeStore } from '../store/useDarkModeStore';
import { darkTheme, lightTheme } from '../css/styles.theme';
import { ThemeProvider } from 'styled-components';

export default function DarkModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const updateDarkMode = useDarkModeStore(
    (state) => state.actions.updateDarkMode
  );

  useEffect(() => {
    const isDark = localStorage.theme === 'dark';
    updateDarkMode(isDark);
  }, [updateDarkMode]);

  const theme = darkMode.darkMode ? darkTheme : lightTheme;
  console.log(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
