import { DrawerToggleButton } from '@react-navigation/drawer';
import { Image, StyleSheet, View } from 'react-native';

export function Header() {
  function handleOpenMenu() {}

  return (
    <View style={s.view}>
      <Image source={require('@/assets/images/logo.png')} style={s.logo} />

      <DrawerToggleButton />
    </View>
  );
}

const s = StyleSheet.create({
  view: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 34,
    resizeMode: 'contain',
  },
  burger: {
    width: 24,
    height: 20,
    resizeMode: 'contain',
  },
});
