import { MyText } from '@/components/ui/MyText';
import { handleError } from '@/utils/handleError';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface IUser {
  name: string;
}

export default function SignIn() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  async function getUserName() {
    try {
      const userData = await AsyncStorage.getItem('userData');

      if (userData !== null) {
        const user = JSON.parse(userData) as IUser;

        setName(user.name);
      }
    } catch (error) {
      handleError(error);
    }
  }

  async function signIn() {
    if (!name) return setError(true);
    setError(false);

    try {
      const userData = JSON.stringify({ name });

      await AsyncStorage.setItem('userData', userData);

      router.navigate({ pathname: '/clients' });
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    if (!name) getUserName();
  }, []);

  return (
    <View style={s.view}>
      <MyText size={32}>Olá, seja bem vindo!</MyText>

      <TextInput
        style={s.input}
        placeholderTextColor='#AAA'
        placeholder='Digite o seu nome:'
        value={name}
        onChangeText={setName}
        onSubmitEditing={signIn}
      />
      {error && <MyText color='red'>Digite o seu nome para continuar.</MyText>}

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#bd521d' : '#EC6724',
          },
          s.button,
        ]}
        onPress={signIn}
      >
        <MyText size={24} color='#fff' weight='700'>
          Entrar
        </MyText>
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
  button: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
