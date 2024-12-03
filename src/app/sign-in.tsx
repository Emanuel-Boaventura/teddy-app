import { useSession } from '@/Contexts/AuthContext';
import { handleError } from '@/utils/handleError';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignIn() {
  const [name, setName] = useState('');

  const { user, storeData } = useSession();

  useEffect(() => {
    if (user) setName(user.name);
  }, []);

  async function signIn() {
    try {
      storeData({ name });

      router.navigate({ pathname: '/home' });
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <View style={s.view}>
      <Text style={s.title}>Olá, seja bem vindo!</Text>

      <TextInput
        style={s.input}
        placeholderTextColor='#AAA'
        placeholder='Digite o seu nome:'
        value={name}
        onChangeText={setName}
      />

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#bd521d' : '#EC6724',
          },
          s.button,
        ]}
        onPress={signIn}
      >
        <Text style={s.buttonText}>Entrar</Text>
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
