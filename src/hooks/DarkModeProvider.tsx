import React, { ReactNode, useEffect } from 'react';
import { useDarkModeActions, useGetDarkMode } from '../store/useDarkModeStore';
import { darkTheme, lightTheme } from '../css/styles.theme';
import { ThemeProvider } from 'styled-components';

export default function DarkModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const isDarkMode = useGetDarkMode();
  const { updateDarkMode } = useDarkModeActions();

  useEffect(() => {
    const isDark = localStorage.theme === 'dark';
    updateDarkMode(isDark);
  }, [updateDarkMode]);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
