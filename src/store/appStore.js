import { create } from 'zustand';

const useAppStore = create((set) => ({
  sidebarOpen: false,
  theme: 'light',
  toasts: [],
  globalLoading: false,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setGlobalLoading: (globalLoading) => set({ globalLoading }),

  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { id: Date.now(), ...toast }],
  })),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id),
  })),
  clearToasts: () => set({ toasts: [] }),
}));

export default useAppStore;
