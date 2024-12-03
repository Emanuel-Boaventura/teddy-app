import { MyText } from '@/components/ui/MyText';
import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={s.container}>
        <MyText style={s.title}>
          Não encontramos a página que você estava procurando.
        </MyText>

        <Link href='/home' style={s.link}>
          <MyText style={s.text}>Voltar para a Home.</MyText>
        </Link>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#EC6724',
    borderRadius: 8,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    color: '#EC6724',
    fontFamily: '700',
  },
  title: {
    fontFamily: '700',
    fontSize: 24,
    textAlign: 'center',
  },
});
