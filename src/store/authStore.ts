import type { AuthState } from "@/@types/interface/authState.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiRequest } from "@/utils/apiRequest";
import type { IUser } from "@/@types/interface/user.interface";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      setToken: (token) => set({ token }),

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          // This will use the cookie automatically
          const response: { user: IUser } = await apiRequest("GET", "/auth/me");

          if (response) {
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          } else {
            // Cookie invalid or expired, clear auth state
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return false;
          }
        } catch {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return false;
        }
      },
    }),
    {
      name: "auth-storage", // Key in localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
