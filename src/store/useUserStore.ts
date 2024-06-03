import { create } from 'zustand';

export interface UserInfo {
  name: string;
  email: string;
  photoURL: string;
  uid: string;
}

interface UserStore {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export const useStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  clearUser: () => {
    set({ user: null });
  },
}));
