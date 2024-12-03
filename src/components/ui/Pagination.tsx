import { PaginationReturn } from '@/hooks/usePagination';
import { Pressable, StyleSheet, View } from 'react-native';
import { MyText } from './MyText';

export function Pagination({ pagination }: { pagination: PaginationReturn }) {
  return (
    <View style={s.container}>
      {pagination.range.map((item) => {
        const isActive = pagination.active === item;

        return (
          <Pressable
            key={item}
            testID='pagination-button'
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#fdf0e9' : 'transparent',
              },
              s.button,
              isActive && s.active,
            ]}
            onPress={() => item !== 'dots' && pagination.setPage(item)}
          >
            <MyText style={[s.text, isActive && s.active]}>
              {item === 'dots' ? '...' : item}
            </MyText>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    fontFamily: '700',
  },
  active: {
    backgroundColor: '#EC6724',
    color: '#fff',
  },
});
