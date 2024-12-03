import { MyText } from '@/components/ui/MyText';
import { View } from 'react-native';

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
      <MyText color={color} weight='600'>
        {title}
      </MyText>
    </View>
  );
}
