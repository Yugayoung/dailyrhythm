import { create } from 'zustand';

export interface DarkModeState {
  darkMode: boolean;
}

interface DarkModeActions {
  toggleDarkMode: () => void;
  updateDarkMode: (darkMode: boolean) => void;
}

export interface DarkModeStore {
  darkMode: DarkModeState;
  actions: DarkModeActions;
}
export default function createDarkModeStore() {
  return create<DarkModeStore>((set) => ({
    darkMode: { darkMode: false },
    actions: {
      toggleDarkMode: () =>
        set((state) => {
          const newDarkMode = !state.darkMode.darkMode;
          state.actions.updateDarkMode(newDarkMode);
          return { darkMode: { darkMode: newDarkMode } };
        }),

      updateDarkMode: (darkMode: boolean) => {
        if (darkMode) {
          localStorage.theme = 'dark';
        } else {
          localStorage.theme = 'light';
        }
        set({ darkMode: { darkMode } });
      },
    },
  }));
}

export const useDarkModeStore = createDarkModeStore();
