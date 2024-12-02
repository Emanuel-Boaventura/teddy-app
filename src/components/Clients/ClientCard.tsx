import { IClients } from '@/Contexts/ClientsContext';
import { currencyMask } from '@/utils/maks';
import { Octicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function ClientCard({ client }: { client: IClients }) {
  function handleEdit() {}
  return (
    <View style={s.card}>
      <Text style={s.bold}>{client.name}</Text>

      <Text style={s.small}>
        Salário: R${currencyMask(client.salary.toString())}
      </Text>

      <Text style={s.small}>
        Empresa: R${currencyMask(client.companyValuation.toString())}
      </Text>

      <View style={s.buttons}>
        <Pressable onPress={handleEdit} style={s.handleButton}>
          <Octicons name='plus' size={20} />
        </Pressable>
        <Pressable onPress={handleEdit} style={s.handleButton}>
          <Octicons name='pencil' size={20} />
        </Pressable>
        <Pressable onPress={handleEdit} style={s.handleButton}>
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
