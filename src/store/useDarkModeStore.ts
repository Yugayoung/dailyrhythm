import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeType, darkTheme, lightTheme } from '../css/styles.theme';

interface DarkModeActions {
  toggleDarkMode: () => void;
  updateDarkMode: (isDarkMode: boolean) => void;
}

export interface DarkModeStore {
  isDarkMode: boolean;
  currentTheme: ThemeType;
  actions: DarkModeActions;
}

export default function createDarkModeStore() {
  return create<DarkModeStore>()(
    persist(
      (set) => ({
        isDarkMode: false,
        currentTheme: lightTheme,
        actions: {
          toggleDarkMode: () =>
            set((state) => {
              const newDarkMode = !state.isDarkMode;
              const newTheme = newDarkMode ? darkTheme : lightTheme;
              state.actions.updateDarkMode(newDarkMode);
              return { isDarkMode: newDarkMode, currentTheme: newTheme };
            }),

          updateDarkMode: (isDarkMode: boolean) => {
            const newTheme = isDarkMode ? darkTheme : lightTheme;
            set({ isDarkMode, currentTheme: newTheme });
          },
        },
      }),
      {
        name: 'dark-mode-storage',
        partialize: (state) => ({
          isDarkMode: state.isDarkMode,
          currentTheme: state.currentTheme,
        }),
      }
    )
  );
}

export const useDarkModeStore = createDarkModeStore();
export const useDarkModeActions = () =>
  useDarkModeStore((state: DarkModeStore) => state.actions);
export const useGetDarkMode = () =>
  useDarkModeStore((state: DarkModeStore) => state.isDarkMode);
export const useGetCurrentTheme = () =>
  useDarkModeStore((state: DarkModeStore) => state.currentTheme);
