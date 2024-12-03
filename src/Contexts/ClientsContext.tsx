import { IClient } from '@/services/users/getAllUsers';
import { handleError } from '@/utils/handleError';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface IClientsProviderProps {
  children: ReactNode;
}

interface IClientsContext {
  clients: IClient[];
  setClients: Dispatch<SetStateAction<IClient[]>>;
  storeData: (newList: IClient[]) => Promise<void>;
  getData: () => Promise<void>;
}

export const ClientsContext = createContext({} as IClientsContext);

export function ClientsProvider({ children }: IClientsProviderProps) {
  const [selectedClients, setSelectedClients] = useState<IClient[]>([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('users');
      console.log('value:', value);
      if (value !== null) {
        console.log('value', value);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const storeData = async (newList: IClient[]) => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(newList));
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <ClientsContext.Provider
      value={{
        clients: selectedClients,
        setClients: setSelectedClients,
        getData,
        storeData,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  return useContext(ClientsContext);
}
