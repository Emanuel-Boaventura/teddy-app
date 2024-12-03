import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { BottomSheetContent } from './BottomSheetContent';

export const AddClientBottomSheet = forwardRef<BottomSheet>((_, ref) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        {...props}
      />
    ),
    []
  );

  const isIos = Platform.OS === 'ios';

  return (
    <BottomSheet
      ref={ref}
      enablePanDownToClose
      index={-1}
      backgroundStyle={s.sheet}
      handleIndicatorStyle={s.indicator}
      backdropComponent={renderBackdrop}
      snapPoints={['70%']}
    >
      {isIos ? (
        <BottomSheetScrollView>
          <BottomSheetContent />
        </BottomSheetScrollView>
      ) : (
        <BottomSheetContent />
      )}
    </BottomSheet>
  );
});

const s = StyleSheet.create({
  sheet: {
    backgroundColor: '#7A7A7A',
  },
  indicator: {
    backgroundColor: '#fff',
    height: 2,
  },
});
