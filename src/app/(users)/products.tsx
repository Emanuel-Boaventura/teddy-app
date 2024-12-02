import { StyleSheet, Text, View } from 'react-native';

export default function Products() {
  return (
    <View style={s.view}>
      <Text>Products!</Text>
    </View>
  );
}

const s = StyleSheet.create({
  view: {
    flex: 1,
    gap: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8590f5',
  },
});
