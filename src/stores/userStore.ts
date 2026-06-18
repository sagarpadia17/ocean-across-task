import { create } from "zustand";
import type { User } from "../types";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user: User) =>
    set({
      user,
      isAuthenticated: true,
    }),

  updateUser: (updates: Partial<User>) =>
    set((state) =>
      state.user
        ? {
            user: { ...state.user, ...updates },
          }
        : {}
    ),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
