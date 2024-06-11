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

export default function createUserStore() {
  return create<UserStore>((set) => ({
    user: null,
    actions: {
      setUser: (user: UserInfo) => {
        set({ user });
      },
      clearUser: () => {
        set({ user: null });
      },
    },
  }));
}

export const useUserStore = createUserStore();

export const useUserActions = () =>
  useUserStore((state: UserStore) => state.actions);
export const useGetUser = () => useUserStore((state: UserStore) => state.user);
