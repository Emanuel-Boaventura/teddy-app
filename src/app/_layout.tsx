import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export const unstable_settings = {
  initialRouteName: 'home',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme !== 'dark';

  return (
    <PaperProvider>
      <Slot />
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </PaperProvider>
  );
}
