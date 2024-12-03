import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { TUserSchema, userSchema } from '@/schemas/userSchema';
import { currencyMask } from '@/utils/maks';
import { yupResolver } from '@hookform/resolvers/yup';

// const hiddenAll = {
//   name: false,
//   salary: false,
//   companyValuation: false,
// };

// const showAll = {
//   name: true,
//   salary: true,
//   companyValuation: true,
// };

export const AddClientBottomSheet = forwardRef<BottomSheet>((_, ref) => {
  // const [show, setShow] = useState(showAll);

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

  const { handleSubmit, control, watch } = useForm<TUserSchema>({
    resolver: yupResolver(userSchema),
  });

  const [name, salary, companyValuation] = watch([
    'name',
    'salary',
    'companyValuation',
  ]);

  function onSubmit(formData: TUserSchema) {
    console.log('formData:', formData);
    console.log('handleSubmit');
  }

  // function handleFocus(string: keyof typeof hiddenAll) {
  //   switch (string) {
  //     case 'name':
  //       setShow({ ...showAll, companyValuation: false });
  //       break;
  //     case 'salary':
  //       setShow({ ...showAll, name: false });
  //       break;
  //     case 'companyValuation':
  //       setShow({ ...hiddenAll, companyValuation: true });
  //       break;
  //   }
  // }

  // function onBlur() {
  //   setShow(showAll);
  // }

  const disabled = !name || !salary || !companyValuation;

  const ref_input2 = useRef<TextInput>(null);
  const ref_input3 = useRef<TextInput>(null);

  return (
    <BottomSheet
      ref={ref}
      enablePanDownToClose
      index={-1}
      backgroundStyle={s.sheet}
      handleIndicatorStyle={s.indicator}
      backdropComponent={renderBackdrop}
      snapPoints={['70%']}
      // enableDynamicSizing={false}
    >
      <BottomSheetView style={[s.content]}>
        <Text style={s.title}>Criar cliente</Text>

        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <View>
              <Text style={s.label}>Nome</Text>
              <TextInput
                style={s.input}
                placeholderTextColor='#bcbcbc'
                placeholder='Digite o nome:'
                value={field.value}
                onChangeText={field.onChange}
                returnKeyType='next'
                onSubmitEditing={() => ref_input2?.current?.focus()}
              />
            </View>
          )}
        />

        <Controller
          control={control}
          name='salary'
          render={({ field }) => (
            <View>
              <Text style={s.label}>Salário</Text>
              <TextInput
                style={s.input}
                placeholderTextColor='#bcbcbc'
                placeholder='Digite o salário'
                value={field.value}
                onChangeText={(txt) => field.onChange(currencyMask(txt))}
                ref={ref_input2}
                returnKeyType='next'
                onSubmitEditing={() => ref_input3?.current?.focus()}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name='companyValuation'
          render={({ field }) => (
            <View>
              <Text style={s.label}>Valor da empresa</Text>
              <TextInput
                style={s.input}
                placeholderTextColor='#bcbcbc'
                placeholder='Digite o valor da empresa:'
                value={field.value}
                onChangeText={(txt) => field.onChange(currencyMask(txt))}
                ref={ref_input3}
              />
            </View>
          )}
        />

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#bc521e' : '#EC6724',
            },
            s.button,
            disabled && s.buttonDisabled,
          ]}
          disabled={disabled}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={[s.buttonText, disabled && s.buttonDisabled]}>
            Criar cliente
          </Text>
        </Pressable>
      </BottomSheetView>
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
  content: {
    padding: 32,
    gap: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: '700',
    color: '#fff',
    marginBottom: -4,
  },
  label: {
    fontSize: 14,
    fontFamily: '500',
    color: '#fff',
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderColor: '#AFAFAF',
    borderWidth: 2,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    fontFamily: '500',
  },
  button: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#878787',
    color: '#7A7A7A',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: '700',
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: '#F00',
    fontSize: 12,
  },
});
