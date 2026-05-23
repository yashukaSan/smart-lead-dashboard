import { useAuthContext } from '../context/AuthContext';

export function useAuth() {
  const { user, token, loading, error, login, register, logout, isAuthenticated } = useAuthContext();

  return {
    user,
    token,
    isLoading: loading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
  };
}
