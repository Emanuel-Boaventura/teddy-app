import { ClientCard } from '@/components/Clients/ClientCard';
import { ItemsPerPageMenu } from '@/components/Clients/ItemsPerPageMenu';
import { Pagination } from '@/components/ui/Pagination';
import { IClients } from '@/Contexts/ClientsContext';
import { usePagination } from '@/hooks/usePagination';
import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const [clients, setClients] = useState<IClients[]>([
    {
      name: 'Eduardo',
      salary: 350000,
      companyValuation: 12000000,
    },
    {
      name: 'Marcos',
      salary: 350000,
      companyValuation: 12000000,
    },
    {
      name: 'Emanuel',
      salary: 350000,
      companyValuation: 12000000,
    },
    {
      name: 'Artur',
      salary: 350000,
      companyValuation: 12000000,
    },
  ]);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [page, onChange] = useState(1);

  const constTotalPages = Math.ceil(clients.length / itemsPerPage);
  const pagination = usePagination({
    total: constTotalPages,
    page,
    onChange,
    initialPage: 1,
    siblings: 1,
  });

  function handleCreateClient() {
    console.log('create');
  }

  return (
    <View style={s.view}>
      <View style={s.quantityView}>
        <Text style={[s.large, s.bold]}>{clients.length}</Text>
        <Text style={s.large}>clientes encontrados:</Text>
      </View>

      <View style={s.perPageView}>
        <Text style={s.large}>Clientes por página:</Text>

        <ItemsPerPageMenu value={itemsPerPage} setValue={setItemsPerPage} />
      </View>

      <View style={s.listWrapper}>
        <FlashList
          data={clients}
          renderItem={({ item }) => <ClientCard client={item} />}
          estimatedItemSize={100}
        />
      </View>

      <View style={s.footer}>
        <Pressable
          style={({ pressed }) => [
            s.createButton,
            {
              backgroundColor: pressed ? '#fdf0e9' : 'transparent',
            },
          ]}
          onPress={handleCreateClient}
        >
          <Text style={s.createText}>Criar cliente</Text>
        </Pressable>

        <Pagination pagination={pagination} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  view: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listWrapper: {
    width: '100%',
    minHeight: 2,
    marginTop: 12,
    flex: 1,
  },
  quantityView: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 6,
  },
  perPageView: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'flex-end',
  },
  large: { fontSize: 18 },
  bold: { fontFamily: '700' },
  footer: {
    width: '100%',
    padding: 20,
    gap: 20,
  },
  createButton: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EC6724',
    height: 40,
    borderWidth: 2,
  },
  createText: {
    fontSize: 14,
    fontFamily: '700',
    color: '#EC6724',
  },
});
