import { AddClientBottomSheet } from '@/components/Clients/AddClientBottomSheet';
import { ClientCard } from '@/components/Clients/ClientCard';
import { ItemsPerPageMenu } from '@/components/Clients/ItemsPerPageMenu';
import { Loader } from '@/components/ui/Loader';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { getAllUsers, IClient } from '@/services/users/getAllUsers';
import { handleError } from '@/utils/handleError';
import BottomSheet from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const [clients, setClients] = useState<IClient[]>([]);
  const [limit, setLimit] = useState(16);
  const [total, setTotal] = useState(1);
  const [page, onChange] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const paginationControl = usePagination({
    total,
    page,
    onChange,
    initialPage: 1,
    siblings: 1,
  });

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpenSheet(id?: number) {
    if (id) setSelectedId(id);
    bottomSheetRef.current?.expand();
  }

  async function getData() {
    try {
      setIsLoading(true);

      const data = await getAllUsers({ limit: limit, page });

      setTotal(data.totalPages);
      setClients(data.clients);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void getData();
  }, [limit, page]);

  return (
    <View style={s.view}>
      <View style={s.quantityView}>
        <Text style={[s.large, s.bold]}>{clients.length}</Text>
        <Text style={s.large}>clientes encontrados:</Text>
      </View>

      <View style={s.perPageView}>
        <Text style={s.large}>Clientes por página:</Text>

        <ItemsPerPageMenu value={limit} setValue={setLimit} />
      </View>

      <View style={s.listWrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <FlashList
            data={clients}
            renderItem={({ item }) => (
              <ClientCard
                client={item}
                handleEdit={handleOpenSheet}
                setIsLoading={setIsLoading}
                refreshData={getData}
              />
            )}
            estimatedItemSize={100}
          />
        )}
      </View>

      <View style={s.footer}>
        <Pressable
          style={({ pressed }) => [
            s.createButton,
            {
              backgroundColor: pressed ? '#fdf0e9' : 'transparent',
            },
          ]}
          onPress={() => handleOpenSheet()}
        >
          <Text style={s.createText}>Criar cliente</Text>
        </Pressable>

        <Pagination pagination={paginationControl} />
      </View>

      <AddClientBottomSheet
        ref={bottomSheetRef}
        userId={selectedId}
        setUserId={setSelectedId}
        refreshData={getData}
      />
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
