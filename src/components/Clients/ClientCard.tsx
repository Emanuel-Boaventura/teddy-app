import { deleteUser } from '@/services/users/deleteUser';
import { IClient } from '@/services/users/getAllUsers';
import { currencyFormatter } from '@/utils/formatters';
import { handleError } from '@/utils/handleError';
import { Octicons } from '@expo/vector-icons';
import { Dispatch, SetStateAction } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

interface IClientCard {
  client: IClient;
  handleEdit: (id: number) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  refreshData: () => Promise<void>;
}

export function ClientCard({
  client,
  handleEdit,
  refreshData,
  setIsLoading,
}: IClientCard) {
  function handleSelectClient() {
    console.log('Selected client:', client);
  }

  function handleEditClient() {
    handleEdit(client.id);
  }

  async function handleDelete(id: number) {
    try {
      setIsLoading(true);
      await deleteUser(id);
      refreshData();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function openDeleteAlert() {
    Alert.alert(
      'Excluir cliente:',
      `Tem certeza que deseja excluir o cliente ${client.name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir cliente',
          style: 'destructive',
          onPress: () => void handleDelete(client.id),
        },
      ]
    );
  }
  return (
    <View style={s.card}>
      <Text style={s.bold}>{client.name}</Text>

      <Text style={s.small}>Salário: {currencyFormatter(client.salary)}</Text>

      <Text style={s.small}>
        Empresa: {currencyFormatter(client.companyValuation)}
      </Text>

      <View style={s.buttons}>
        <Pressable onPress={handleSelectClient} style={s.handleButton}>
          <Octicons name='plus' size={20} />
        </Pressable>
        <Pressable onPress={handleEditClient} style={s.handleButton}>
          <Octicons name='pencil' size={20} />
        </Pressable>
        <Pressable onPress={openDeleteAlert} style={s.handleButton}>
          <Octicons name='trash' size={20} color='#F00' />
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    paddingTop: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    flex: 1,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 5,
    gap: 6,
  },
  handleButton: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 6,
  },
  small: { fontSize: 14 },
  bold: { fontWeight: 'bold' },
});
