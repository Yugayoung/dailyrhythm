import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserInfo {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

export interface UserStore {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

function createUserStore() {
  return create<UserStore>()(
    persist(
      (set) => ({
        user: null,
        setUser: (user: UserInfo) => {
          set({ user });
        },
        clearUser: () => {
          set({ user: null });
        },
      }),
      {
        name: 'user-storage',
        storage: {
          getItem: (name) => {
            const item = localStorage.getItem(name);
            return item ? JSON.parse(item) : null;
          },
          setItem: (name, value) => {
            localStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: (name) => {
            localStorage.removeItem(name);
          },
        },
      }
    )
  );
}

export const useUserStore = createUserStore();

export const useUserActions = () => {
  return {
    setUser: useUserStore((state) => state.setUser),
    clearUser: useUserStore((state) => state.clearUser),
  };
};

export const useGetUser = () => useUserStore((state: UserStore) => state.user);
