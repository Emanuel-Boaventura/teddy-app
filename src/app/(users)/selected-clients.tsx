import { ClientCard } from '@/components/Clients/ClientCard';
import { Loader } from '@/components/ui/Loader';
import { MyText } from '@/components/ui/MyText';
import { useClients } from '@/Contexts/ClientsContext';
import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export default function SelectedClients() {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedClients, removeAllClients } = useClients();

  return (
    <View style={s.view}>
      <MyText size={22} weight='700'>
        Clientes selecionados:
      </MyText>

      <View style={s.listWrapper}>
        {isLoading ? (
          <Loader />
        ) : (
          <FlashList
            data={selectedClients}
            renderItem={({ item }) => (
              <ClientCard
                client={item}
                setIsLoading={setIsLoading}
                isEditEnabled={false}
              />
            )}
            estimatedItemSize={100}
          />
        )}
      </View>

      <View style={s.footer}>
        <Pressable
          style={({ pressed }) => [
            s.clearButton,
            {
              backgroundColor: pressed ? '#fdf0e9' : 'transparent',
            },
          ]}
          onPress={removeAllClients}
        >
          <MyText weight='700' color='#ec6724'>
            Limpar clientes selecionados
          </MyText>
        </Pressable>
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
  footer: {
    width: '100%',
    padding: 20,
    gap: 20,
    marginBottom: 'auto',
  },
  clearButton: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EC6724',
    height: 40,
    borderWidth: 2,
  },
});
