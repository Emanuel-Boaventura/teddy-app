import { useClients } from '@/Contexts/ClientsContext';
import { deleteUser } from '@/services/users/deleteUser';
import { IClient } from '@/services/users/getAllUsers';
import { currencyFormatter } from '@/utils/formatters';
import { handleError } from '@/utils/handleError';
import { Octicons } from '@expo/vector-icons';
import { Dispatch, SetStateAction } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { MyText } from '../ui/MyText';

interface IClientCard {
  client: IClient;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleEdit?: (id: number) => void;
  refreshData?: () => Promise<void>;
  isEditEnabled?: boolean;
}

export function ClientCard({
  client,
  handleEdit,
  refreshData,
  setIsLoading,
  isEditEnabled = true,
}: IClientCard) {
  const { removeClient, selectClient, selectedClients } = useClients();

  const isSelected = selectedClients?.some(({ id }) => id === client.id);

  async function handleSaveOrRemoveClient() {
    try {
      if (isSelected) {
        await removeClient(client.id);
      } else {
        await selectClient(client);
      }
    } catch (error) {
      handleError(error);
    }
  }

  function handleEditClient() {
    if (handleEdit) handleEdit(client.id);
  }

  async function handleDelete(id: number) {
    try {
      setIsLoading(true);

      if (isSelected) {
        await removeClient(id);
      }

      await deleteUser(id);

      if (refreshData) refreshData();
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
      <MyText size={16} weight='700'>
        {client.name}
      </MyText>

      <MyText>Salário: {currencyFormatter(client.salary)}</MyText>

      <MyText>Empresa: {currencyFormatter(client.companyValuation)}</MyText>

      <View
        style={[
          s.buttons,
          { justifyContent: isEditEnabled ? 'space-between' : 'flex-end' },
        ]}
      >
        <Pressable onPress={handleSaveOrRemoveClient} style={s.button}>
          <Octicons
            name={isSelected ? 'dash' : 'plus'}
            color={isSelected ? '#F00' : '#000'}
            size={20}
          />
        </Pressable>

        {isEditEnabled && (
          <>
            <Pressable onPress={handleEditClient} style={s.button}>
              <Octicons name='pencil' size={20} />
            </Pressable>

            <Pressable onPress={openDeleteAlert} style={s.button}>
              <Octicons name='trash' size={20} color='#F00' />
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    paddingTop: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 5,
    gap: 6,
  },
  button: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 6,
  },
});
