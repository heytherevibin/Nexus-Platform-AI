import { useContext } from 'react';
import { AuthContext } from './providers/SupabaseAuthProvider';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext must be used within AuthProvider');

  return context;
};
