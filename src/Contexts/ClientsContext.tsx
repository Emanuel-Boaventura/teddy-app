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

export interface IClients {
  name: string;
  salary: number;
  companyValuation: number;
}

interface IClientsContext {
  clients: IClients[];
  setClients: Dispatch<SetStateAction<IClients[]>>;
  storeData: (newList: IClients[]) => Promise<void>;
  getData: () => Promise<void>;
}

export const ClientsContext = createContext({} as IClientsContext);

export function ClientsProvider({ children }: IClientsProviderProps) {
  const [selectedClients, setSelectedClients] = useState<IClients[]>([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('users');
      console.log('value:', value);
      if (value !== null) {
        console.log('value', value);
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  const storeData = async (newList: IClients[]) => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(newList));
    } catch (error) {
      console.log('error:', error);
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
