import { Loader } from '@/components/ui/Loader';
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from '@expo-google-fonts/inter';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Index() {
  let [fontsLoaded] = useFonts({
    '100': Inter_100Thin,
    '200': Inter_200ExtraLight,
    '300': Inter_300Light,
    '400': Inter_400Regular,
    '500': Inter_500Medium,
    '600': Inter_600SemiBold,
    '700': Inter_700Bold,
    '800': Inter_800ExtraBold,
    '900': Inter_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) router.replace('/sign-in');
  }, [fontsLoaded]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Loader />
    </View>
  );
}
