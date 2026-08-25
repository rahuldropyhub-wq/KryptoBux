import api from './api';

const earningService = {
  // PTC
  getPTCAds: (params) => api.get('/earning/ptc', { params }),
  completePTCAd: (id) => api.post(`/earning/ptc/${id}/complete`),

  // Shortlinks
  getShortlinks: (params) => api.get('/earning/shortlinks', { params }),
  completeShortlink: (id) => api.post(`/earning/shortlinks/${id}/complete`),

  // Faucet
  getFaucetStatus: () => api.get('/earning/faucet'),
  claimFaucet: () => api.post('/earning/faucet/claim'),

  // Daily Bonus
  getDailyBonusStatus: () => api.get('/earning/daily-bonus'),
  claimDailyBonus: () => api.post('/earning/daily-bonus/claim'),

  // Coupons
  redeemCoupon: (code) => api.post('/earning/coupons/redeem', { code }),
  getCouponHistory: () => api.get('/earning/coupons/history'),

  // Spin Wheel
  getSpinStatus: () => api.get('/earning/spin'),
  spinWheel: () => api.post('/earning/spin'),

  // Streaks
  getStreakStatus: () => api.get('/earning/streaks'),

  // Challenges
  getChallenges: () => api.get('/earning/challenges'),
  completeChallengeTask: (id, taskId) => api.post(`/earning/challenges/${id}/tasks/${taskId}`),

  // Leaderboard
  getLeaderboard: (params) => api.get('/earning/leaderboard', { params }),
};

export default earningService;
