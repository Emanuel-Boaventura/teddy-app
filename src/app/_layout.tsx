import { AuthProvider } from '@/Contexts/AuthContext';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'home',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme !== 'dark';

  return (
    <AuthProvider>
      <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
        <Slot />
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </ThemeProvider>
    </AuthProvider>
  );
}
