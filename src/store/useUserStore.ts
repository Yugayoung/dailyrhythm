import { create } from 'zustand';

export interface UserInfo {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

interface UserActions {
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export interface UserStore {
  user: UserInfo | null;
  actions: UserActions;
}

function createUserStore() {
  return create<UserStore>((set) => ({
    user: (() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          return null;
        }
      }
      return null;
    })(),
    actions: {
      setUser: (user: UserInfo) => {
        set({ user });
        localStorage.setItem('user', JSON.stringify(user));
      },
      clearUser: () => {
        set({ user: null });
        localStorage.removeItem('user');
      },
    },
  }));
}

export const useUserStore = createUserStore();

export const useUserActions = () =>
  useUserStore((state: UserStore) => state.actions);
export const useGetUser = () => useUserStore((state: UserStore) => state.user);
