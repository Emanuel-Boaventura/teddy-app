import { MyDrawerItem } from '@/components/Layout/Drawer/DrawerItem';
import { MyDrawer } from '@/components/Layout/Drawer/MyDrawer';
import { Header } from '@/components/Layout/Header';
import { ClientsProvider } from '@/Contexts/ClientsContext';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function ClientsLayout() {
  return (
    <ClientsProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
          initialRouteName='clients'
          drawerContent={MyDrawer}
        >
          <Drawer.Screen
            name='sign-in'
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
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name='clients'
            options={{
              drawerLabel: ({ color, focused }) => (
                <MyDrawerItem color={color} focused={focused} title='Clients' />
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
            name='selected-clients'
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
