import { useSession } from '@/Contexts/AuthContext';
import { StyleSheet, Text, View } from 'react-native';

export default function SelectedClients() {
  const { signOut } = useSession();

  const DATA = [
    {
      title: 'First Item',
    },
    {
      title: 'Second Item',
    },
  ];

  return (
    <View style={s.view}>
      <Text style={s.title}>Selected Clients!</Text>

      <View style={s.listWrapper}>
        {/* <FlashList
          data={DATA}
          renderItem={({ item }) => (
            <Text
              style={{
                height: 30,
                width: '100%',
                backgroundColor: '#ffadcb',
              }}
            >
              {item.title}
            </Text>
          )}
          estimatedItemSize={200}
        /> */}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  view: {
    flex: 1,
    gap: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8590f5',
  },
  listWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#b9ffaf',
  },
  input: {
    fontSize: 24,
    padding: 16,
    paddingLeft: 20,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#D9D9D9',
    width: '100%',
  },
  title: {
    fontSize: 32,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
