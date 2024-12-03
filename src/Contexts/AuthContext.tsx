import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

interface IAuthContext {
  user: IUser | null;
  storeData: (user: IUser) => Promise<void>;
  isLoading?: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  storeData: async () => {},
  isLoading: true,
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface IUser {
  name: string;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    try {
      setIsLoading(true);
      const jsonValue = await AsyncStorage.getItem('userData');
      setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (error) {
      console.log('error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function storeData(user: IUser) {
    try {
      setIsLoading(true);
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem('userData', jsonValue);
      setUser(user);
    } catch (error) {
      console.log('error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void getData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        storeData,
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
