import { useSession } from '@/Contexts/AuthContext';

import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function SelectedClients() {
  const snapPoints = useMemo(() => ['25%'], []);

  const ref = useRef<BottomSheet>(null);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          ref.current?.expand();
        }}
      >
        <Text>Open</Text>
      </Pressable>
      <BottomSheet ref={ref} snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <BottomSheetTextInput value='Awesome 🎉' style={styles.textInput} />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  textInput: {
    alignSelf: 'stretch',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
