import { Header } from '@/components/Header';
import { useSession } from '@/Contexts/AuthContext';
import { Redirect, router, Stack } from 'expo-router';
import { ActivityIndicator, Text } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'home',
};

export default function ClientsLayout() {
  const { session, isLoading } = useSession();
  console.log('Validating on ClientsLayout.....');

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <ActivityIndicator color='#EC6724' size='large' />;
  }

  if (!session) {
    router.replace('/sign-in');
  }

  return (
    <Stack screenOptions={{ headerTitle: () => <Header /> }}>
      <Stack.Screen name='home' />
    </Stack>
  );
}
