import useWalletStore from '@/store/walletStore';

const useWallet = () => {
  const { balance, totalEarned, todayEarnings, pendingWithdrawals, transactions, withdrawals, walletAddresses, isLoading, setBalance, setWalletData, setTransactions, setWithdrawals, setWalletAddresses, addTransaction, setLoading, reset } = useWalletStore();

  return {
    balance,
    totalEarned,
    todayEarnings,
    pendingWithdrawals,
    transactions,
    withdrawals,
    walletAddresses,
    isLoading,
    setBalance,
    setWalletData,
    setTransactions,
    setWithdrawals,
    setWalletAddresses,
    addTransaction,
    setLoading,
    reset,
  };
};

export default useWallet;
