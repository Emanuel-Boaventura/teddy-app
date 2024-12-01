import { useSession } from '@/Contexts/AuthContext';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const { signOut } = useSession();

  return (
    <View style={s.view}>
      <Text style={s.title}>Home!</Text>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#bd521d' : '#EC6724',
          },
          s.button,
        ]}
        onPress={signOut}
      >
        <Text style={s.buttonText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
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
