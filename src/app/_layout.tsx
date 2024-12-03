import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

export const unstable_settings = {
  initialRouteName: 'home',
};

export default function RootLayout() {
  return (
    <PaperProvider>
      <Slot />
      <StatusBar style='dark' />
    </PaperProvider>
  );
}
