import { IClient } from '@/services/users/getAllUsers';
import { handleError } from '@/utils/handleError';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IClientsProviderProps {
  children: ReactNode;
}

interface IClientsContext {
  selectedClients: IClient[];
  selectClient: (client: IClient) => Promise<void>;
  removeClient: (clientId: number) => Promise<void>;
  removeAllClients: () => Promise<void>;
}

export const ClientsContext = createContext({} as IClientsContext);

export function ClientsProvider({ children }: IClientsProviderProps) {
  const [selectedClients, setSelectedClients] = useState<IClient[]>([]);

  async function loadClientsFromStorage() {
    try {
      const value = await AsyncStorage.getItem('users');
      if (value !== null) {
        setSelectedClients(JSON.parse(value));
      }
    } catch (error) {
      handleError(error);
    }
  }

  async function saveClientsOnStorage(newList: IClient[]) {
    await AsyncStorage.setItem('users', JSON.stringify(newList));
  }

  async function selectClient(client: IClient) {
    const newClients = [...selectedClients, client];

    setSelectedClients(newClients);
    await saveClientsOnStorage(newClients);
  }

  async function removeClient(clientId: number) {
    const newClients = selectedClients.filter(({ id }) => id !== clientId);

    setSelectedClients(newClients);
    await saveClientsOnStorage(newClients);
  }

  async function removeAllClients() {
    setSelectedClients([]);
    await saveClientsOnStorage([]);
  }

  useEffect(() => {
    void loadClientsFromStorage();
  }, []);

  return (
    <ClientsContext.Provider
      value={{
        selectedClients,
        selectClient,
        removeClient,
        removeAllClients,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  return useContext(ClientsContext);
}
