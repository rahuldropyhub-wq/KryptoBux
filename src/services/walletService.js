import api from './api';

const walletService = {
  getBalance: () => api.get('/wallet/balance'),
  getTransactions: (params) => api.get('/wallet/transactions', { params }),
  requestWithdrawal: (data) => api.post('/wallet/withdraw', data),
  getWithdrawalHistory: (params) => api.get('/wallet/withdrawals', { params }),
  getWalletAddresses: () => api.get('/wallet/addresses'),
  addWalletAddress: (data) => api.post('/wallet/addresses', data),
  removeWalletAddress: (id) => api.delete(`/wallet/addresses/${id}`),
};

export default walletService;
