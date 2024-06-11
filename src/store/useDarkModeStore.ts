import { create } from 'zustand';

// 1. currentTheme을 할당해서 true, false뿐 아니라 현재 무슨테마인지 알려주기 =>리뷰보고 persist활용
// 2. 버튼 유연하게 색상지정할 . 수있게 이제 제대로 설정할수있다!!
// 3. 다른곳도 색상지정할수있지롱
interface DarkModeActions {
  toggleDarkMode: () => void;
  updateDarkMode: (isdarkMode: boolean) => void;
}

export interface DarkModeStore {
  isDarkMode: boolean;
  currentTheme: string;
  actions: DarkModeActions;
}
export default function createDarkModeStore() {
  return create<DarkModeStore>((set) => ({
    isDarkMode: false,
    currentTheme: 'light',
    actions: {
      toggleDarkMode: () =>
        set((state) => {
          const newDarkMode = !state.isDarkMode;
          const newTheme = newDarkMode ? 'dark' : 'light';
          state.actions.updateDarkMode(newDarkMode);
          return { isDarkMode: newDarkMode, currentTheme: newTheme };
        }),

      updateDarkMode: (isDarkMode: boolean) => {
        const newTheme = isDarkMode ? 'dark' : 'light';
        localStorage.theme = newTheme;
        set({ isDarkMode, currentTheme: newTheme });
      },
    },
  }));
}

export const useDarkModeStore = createDarkModeStore();
export const useDarkModeActions = () =>
  useDarkModeStore((state: DarkModeStore) => state.actions);
export const useGetDarkMode = () =>
  useDarkModeStore((state: DarkModeStore) => state.isDarkMode);
export const useGetCurrentTheme = () =>
  useDarkModeStore((state: DarkModeStore) => state.currentTheme);
