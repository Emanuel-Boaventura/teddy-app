import { Ionicons } from '@expo/vector-icons';
import { Dispatch, SetStateAction, useState } from 'react';
import { Pressable } from 'react-native';
import { Menu } from 'react-native-paper';
import { MyText } from '../ui/MyText';

interface IItemsPerPageMenu {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const limitOptions = [16, 32, 64, 128];

export function ItemsPerPageMenu({ value, setValue }: IItemsPerPageMenu) {
  const [openDialog, setOpenDialog] = useState(false);

  function toggleDialog() {
    setOpenDialog((prev) => !prev);
  }

  return (
    <Menu
      visible={openDialog}
      onDismiss={toggleDialog}
      anchorPosition='bottom'
      style={{ width: 50 }}
      contentStyle={{ backgroundColor: '#fff' }}
      anchor={
        <Pressable
          style={({ pressed }) => ({
            borderWidth: 1,
            borderColor: '#d9d9d9',
            borderRadius: 4,
            height: 24,
            width: 50,
            backgroundColor: pressed ? '#fff' : '#f5f5f5',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          })}
          onPress={toggleDialog}
        >
          <MyText size={12}>{value}</MyText>

          <Ionicons
            name='chevron-down'
            size={16}
            color='#d9d9d9'
            style={{ width: 16 }}
          />
        </Pressable>
      }
    >
      {limitOptions.map((item) => (
        <Menu.Item
          key={item}
          onPress={() => {
            setValue(item);
            toggleDialog();
          }}
          contentStyle={{
            minWidth: 'auto',
            width: 50,
            marginLeft: -12,
          }}
          titleStyle={{ textAlign: 'center', color: '#000' }}
          style={{ minWidth: 'auto' }}
          title={item.toString()}
        />
      ))}
    </Menu>
  );
}
