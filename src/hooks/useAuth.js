import useAuthStore from '@/store/authStore';

const useAuth = () => {
  const { user, token, isAuthenticated, isAdmin, isLoading, login, logout, setLoading, updateUser } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isLoading,
    login,
    logout,
    setLoading,
    updateUser,
  };
};

export default useAuth;
