import { MyDrawerItem } from '@/components/Layout/Drawer/DrawerItem';
import { MyDrawer } from '@/components/Layout/Drawer/MyDrawer';
import { Header } from '@/components/Layout/Header';
import { useSession } from '@/Contexts/AuthContext';
import { ClientsProvider } from '@/Contexts/ClientsContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  initialRouteName: 'home',
};

export default function ClientsLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <ActivityIndicator color='#EC6724' size='large' />;
  }

  if (!session) {
    router.replace('/sign-in');
  }

  return (
    <ClientsProvider>
      <GestureHandlerRootView>
        <Drawer
          screenOptions={{
            headerTitle: () => <Header />,
            drawerPosition: 'right',
            headerLeft: () => null,
            drawerActiveBackgroundColor: 'transparent',
            drawerInactiveBackgroundColor: 'transparent',
            drawerHideStatusBarOnOpen: true,
            drawerStyle: {
              width: '66%',
              backgroundColor: '#A3A3A3',
              borderTopLeftRadius: 32,
              borderBottomLeftRadius: 32,
            },
            drawerActiveTintColor: '#ec6724',
            drawerItemStyle: {
              marginRight: -18,
              marginLeft: 12,
              marginBottom: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
          drawerContent={MyDrawer}
        >
          <Drawer.Screen
            name='home'
            options={{
              drawerLabel: ({ color, focused }) => (
                <MyDrawerItem color={color} focused={focused} title='Home' />
              ),
              drawerIcon: ({ color, focused }) => (
                <Ionicons
                  name='home'
                  size={20}
                  color={color}
                  style={{ marginLeft: focused ? -4 : 0 }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name='selected-clients'
            options={{
              drawerLabel: ({ color, focused }) => (
                <MyDrawerItem
                  color={color}
                  focused={focused}
                  title='Clientes Selecionados'
                />
              ),
              drawerIcon: ({ color, focused }) => (
                <Ionicons
                  name='person'
                  size={20}
                  color={color}
                  style={{ marginLeft: focused ? -4 : 0 }}
                />
              ),
            }}
          />
          <Drawer.Screen
            name='products'
            options={{
              drawerLabel: ({ color, focused }) => (
                <MyDrawerItem
                  color={color}
                  focused={focused}
                  title='Produtos'
                />
              ),
              drawerIcon: ({ color, focused }) => (
                <Ionicons
                  name='grid'
                  size={20}
                  color={color}
                  style={{ marginLeft: focused ? -4 : 0 }}
                />
              ),
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ClientsProvider>
  );
}
