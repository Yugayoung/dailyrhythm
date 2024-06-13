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

const LOCAL_STORAGE_KEY = 'user';

function saveUserToLocalStorage(user: UserInfo | null) {
  if (user) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

function loadUserFromLocalStorage(): UserInfo | null {
  const user = localStorage.getItem(LOCAL_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
}

export default function createUserStore() {
  return create<UserStore>((set) => ({
    user: loadUserFromLocalStorage(),
    actions: {
      setUser: (user: UserInfo) => {
        set({ user });
        saveUserToLocalStorage(user);
      },
      clearUser: () => {
        set({ user: null });
        saveUserToLocalStorage(null);
      },
    },
  }));
}

export const useUserStore = createUserStore();

export const useUserActions = () =>
  useUserStore((state: UserStore) => state.actions);
export const useGetUser = () => useUserStore((state: UserStore) => state.user);
