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

export const userStore = create<UserStore>((set) => ({
  user: null,
  actions: {
    setUser: (user) => {
      set({ user });
    },
    clearUser: () => {
      set({ user: null });
    },
  },
}));
