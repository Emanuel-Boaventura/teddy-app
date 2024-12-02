import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Dimensions, Image, View } from 'react-native';

export function MyDrawer(props: DrawerContentComponentProps) {
  const DIMENSIONS = Dimensions.get('window');
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
          }}
        >
          <Image
            source={require('@/assets/images/logo.png')}
            style={{
              width: 91,
              height: 44,
              resizeMode: 'contain',
            }}
          />
        </View>

        <View
          style={{
            margin: -12,
            backgroundColor: '#f5f5f5',
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: 32,
            height: DIMENSIONS.height,
            paddingTop: 20,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
