import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import appConfig from '@/config/appConfig';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),

      login: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
        isAdmin: user?.role === 'admin',
      }),

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        isAdmin: false,
      }),

      updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates },
      })),
    }),
    {
      name: appConfig.auth.tokenKey,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);

export default useAuthStore;
