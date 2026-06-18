import { create } from "zustand";
import type { User } from "../types";
import { sessionManager } from "../utils/sessionManager";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  clearUser: () => void;
  restoreSession: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user: User) => {
    sessionManager.saveSession(user);
    set({
      user,
      isAuthenticated: true,
    });
  },

  updateUser: (updates: Partial<User>) =>
    set((state) => {
      if (state.user) {
        const updatedUser = { ...state.user, ...updates };
        sessionManager.saveSession(updatedUser);
        return { user: updatedUser };
      }
      return {};
    }),

  logout: () => {
    sessionManager.clearSession();
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  clearUser: () => {
    sessionManager.clearSession();
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  restoreSession: () => {
    const session = sessionManager.getSession();
    if (session) {
      set({
        user: session,
        isAuthenticated: true,
      });
    }
  },
}));
