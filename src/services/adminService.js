import api from './api';

const adminService = {
  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard'),

  // Users
  getUsers: (params) => api.get('/admin/users', { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  banUser: (id) => api.post(`/admin/users/${id}/ban`),
  unbanUser: (id) => api.post(`/admin/users/${id}/unban`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  adjustBalance: (id, data) => api.post(`/admin/users/${id}/balance`, data),

  // Wallets & Transactions
  getWallets: (params) => api.get('/admin/wallets', { params }),
  getTransactions: (params) => api.get('/admin/transactions', { params }),

  // Withdrawals
  getWithdrawals: (params) => api.get('/admin/withdrawals', { params }),
  approveWithdrawal: (id) => api.post(`/admin/withdrawals/${id}/approve`),
  rejectWithdrawal: (id, reason) => api.post(`/admin/withdrawals/${id}/reject`, { reason }),

  // PTC Ads
  getPTCAds: (params) => api.get('/admin/ptc', { params }),
  createPTCAd: (data) => api.post('/admin/ptc', data),
  updatePTCAd: (id, data) => api.put(`/admin/ptc/${id}`, data),
  deletePTCAd: (id) => api.delete(`/admin/ptc/${id}`),
  togglePTCAd: (id, status) => api.patch(`/admin/ptc/${id}/status`, { status }),

  // Shortlinks
  getShortlinks: (params) => api.get('/admin/shortlinks', { params }),
  createShortlink: (data) => api.post('/admin/shortlinks', data),
  updateShortlink: (id, data) => api.put(`/admin/shortlinks/${id}`, data),
  deleteShortlink: (id) => api.delete(`/admin/shortlinks/${id}`),

  // Advertisements
  getAdvertisements: (params) => api.get('/admin/advertisements', { params }),
  createAdvertisement: (data) => api.post('/admin/advertisements', data),
  updateAdvertisement: (id, data) => api.put(`/admin/advertisements/${id}`, data),
  deleteAdvertisement: (id) => api.delete(`/admin/advertisements/${id}`),

  // Coupons
  getCoupons: (params) => api.get('/admin/coupons', { params }),
  createCoupon: (data) => api.post('/admin/coupons', data),
  updateCoupon: (id, data) => api.put(`/admin/coupons/${id}`, data),
  deleteCoupon: (id) => api.delete(`/admin/coupons/${id}`),

  // Support Tickets
  getTickets: (params) => api.get('/admin/tickets', { params }),
  getTicketById: (id) => api.get(`/admin/tickets/${id}`),
  replyToTicket: (id, data) => api.post(`/admin/tickets/${id}/reply`, data),
  closeTicket: (id) => api.patch(`/admin/tickets/${id}/close`),

  // System
  getSystemSettings: () => api.get('/admin/settings'),
  updateSystemSettings: (data) => api.put('/admin/settings', data),
  getReports: (params) => api.get('/admin/reports', { params }),
  getSecurityLogs: (params) => api.get('/admin/security', { params }),
};

export default adminService;
