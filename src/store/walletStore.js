import { create } from 'zustand';

const useWalletStore = create((set) => ({
  balance: 0,
  totalEarned: 0,
  todayEarnings: 0,
  pendingWithdrawals: 0,
  transactions: [],
  withdrawals: [],
  walletAddresses: [],
  isLoading: false,

  setBalance: (balance) => set({ balance }),
  setWalletData: (data) => set({
    balance: data.balance || 0,
    totalEarned: data.totalEarned || 0,
    todayEarnings: data.todayEarnings || 0,
    pendingWithdrawals: data.pendingWithdrawals || 0,
  }),
  setTransactions: (transactions) => set({ transactions }),
  setWithdrawals: (withdrawals) => set({ withdrawals }),
  setWalletAddresses: (walletAddresses) => set({ walletAddresses }),
  addTransaction: (tx) => set((state) => ({
    transactions: [tx, ...state.transactions],
    balance: state.balance + tx.amount,
  })),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({ balance: 0, totalEarned: 0, todayEarnings: 0, pendingWithdrawals: 0, transactions: [], withdrawals: [], walletAddresses: [] }),
}));

export default useWalletStore;
