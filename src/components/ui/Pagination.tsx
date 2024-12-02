import { PaginationReturn } from '@/hooks/usePagination';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function Pagination({ pagination }: { pagination: PaginationReturn }) {
  return (
    <View style={s.container}>
      {pagination.range.map((item) => {
        const isActive = pagination.active === item;

        return (
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#fdf0e9' : 'transparent',
              },
              s.button,
              isActive && s.active,
            ]}
            onPress={() => item !== 'dots' && pagination.setPage(item)}
          >
            <Text style={[s.text, isActive && s.active]}>
              {item === 'dots' ? '...' : item}
            </Text>
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
