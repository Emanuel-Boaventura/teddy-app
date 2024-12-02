import { Text, View } from 'react-native';

type MyDrawerItemProps = {
  color: string;
  focused: boolean;
  title: string;
};

export function MyDrawerItem({ color, focused, title }: MyDrawerItemProps) {
  return (
    <View
      style={{
        borderRightWidth: focused ? 2 : 0,
        borderColor: '#ec6724',
        width: '100%',
        marginLeft: focused ? -2 : 0,
      }}
    >
      <Text style={{ color: color, fontFamily: 'Inter_600SemiBold' }}>
        {title}
      </Text>
    </View>
  );
}
