import { useStorageState } from '@/hooks/useStorageState';
import { createContext, useContext } from 'react';

interface IAuthContext {
  signIn: (name: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

// This hook can be used to access the user info.

export function AuthProvider({ children }: IAuthProviderProps) {
  const [[isLoading, session], setSession] = useStorageState('session');

  function signIn(name: string) {
    setSession(name);
  }
  function signOut() {
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  return useContext(AuthContext);
}
