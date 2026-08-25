import api from './api';

const userService = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  updatePassword: (data) => api.put('/user/password', data),
  uploadAvatar: (formData) => api.post('/user/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getNotifications: (params) => api.get('/user/notifications', { params }),
  markNotificationRead: (id) => api.patch(`/user/notifications/${id}/read`),
  markAllNotificationsRead: () => api.patch('/user/notifications/read-all'),
  getSettings: () => api.get('/user/settings'),
  updateSettings: (data) => api.put('/user/settings', data),
  getReferrals: (params) => api.get('/user/referrals', { params }),
  getReferralCode: () => api.get('/user/referral-code'),
};

export default userService;
