import { create } from 'zustand';

const useUserStore = create((set) => ({
  profile: null,
  notifications: [],
  unreadCount: 0,
  referrals: [],
  vipLevel: 0,
  streak: 0,
  isLoading: false,

  setProfile: (profile) => set({ profile }),
  setNotifications: (notifications) => set({
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
  }),
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),
  markAllRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0,
  })),
  setReferrals: (referrals) => set({ referrals }),
  setVipLevel: (vipLevel) => set({ vipLevel }),
  setStreak: (streak) => set({ streak }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ profile: null, notifications: [], unreadCount: 0, referrals: [], vipLevel: 0, streak: 0 }),
}));

export default useUserStore;
