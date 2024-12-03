import useKeyboard from '@/hooks/useKeyboard';
import { TUserSchema, userSchema } from '@/schemas/userSchema';
import { currencyMask } from '@/utils/maks';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';

export const BottomSheetContent = () => {
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

  const { height } = useKeyboard();

  const disabled = !name || !salary || !companyValuation;

  const ref_input2 = useRef<TextInput>(null);
  const ref_input3 = useRef<TextInput>(null);
  const isIos = Platform.OS === 'ios';

  return (
    <BottomSheetView style={s.content}>
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
              keyboardType='decimal-pad'
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
              keyboardType='decimal-pad'
              value={field.value}
              onChangeText={(txt) => field.onChange(currencyMask(txt))}
              ref={ref_input3}
              returnKeyType='done'
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

      <Animated.View style={{ height: isIos ? height : 0 }} />
    </BottomSheetView>
  );
};

const s = StyleSheet.create({
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
});
