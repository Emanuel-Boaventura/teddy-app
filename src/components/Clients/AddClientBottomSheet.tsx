import useKeyboard from '@/hooks/useKeyboard';
import { TUserSchema, userSchema } from '@/schemas/userSchema';
import { createUser } from '@/services/users/createUser';
import { getUserById } from '@/services/users/getUserById';
import { updateUser } from '@/services/users/updateUser';
import {
  currencyFormatter,
  currencyToNumberFormatter,
} from '@/utils/formatters';
import { handleError } from '@/utils/handleError';
import { currencyMask } from '@/utils/masks';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { yupResolver } from '@hookform/resolvers/yup';
import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { Loader } from '../ui/Loader';

type SheetProps = {
  userId: number | null;
  setUserId: Dispatch<SetStateAction<number | null>>;
  refreshData: () => Promise<void>;
};

export const AddClientBottomSheet = forwardRef<BottomSheet, SheetProps>(
  ({ userId, setUserId, refreshData }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, control, watch, setValue } = useForm<TUserSchema>({
      resolver: yupResolver(userSchema),
    });

    const [name, salary, companyValuation] = watch([
      'name',
      'salary',
      'companyValuation',
    ]);

    async function onSubmit(formData: TUserSchema) {
      setIsLoading(true);
      try {
        const payload = {
          name: formData.name,
          salary: currencyToNumberFormatter(formData.salary),
          companyValuation: currencyToNumberFormatter(
            formData.companyValuation
          ),
        };

        if (userId) {
          await updateUser(userId, payload);
        } else {
          await createUser(payload);
        }

        refreshData();
        (ref as React.RefObject<BottomSheet>).current?.close();
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    }

    const { height } = useKeyboard();

    const disabled = !name || !salary || !companyValuation;

    const ref_input2 = useRef<TextInput>(null);
    const ref_input3 = useRef<TextInput>(null);
    const isIos = Platform.OS === 'ios';

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

    async function getData(id: number) {
      try {
        setIsLoading(true);

        const data = await getUserById(id);

        setValue('name', data.name);
        setValue('salary', currencyFormatter(data.salary));
        setValue('companyValuation', currencyFormatter(data.companyValuation));
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    }

    const handleStateChange = useCallback((index: number) => {
      // clean form when close
      if (index === -1) {
        setValue('name', '');
        setValue('salary', '');
        setValue('companyValuation', '');
        setUserId(null);
      }
    }, []);

    useEffect(() => {
      if (userId !== null) void getData(userId);
    }, [userId]);

    const ContentWrapper = isIos ? BottomSheetScrollView : React.Fragment;

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose
        index={-1}
        backgroundStyle={s.sheet}
        handleIndicatorStyle={s.indicator}
        backdropComponent={renderBackdrop}
        onChange={handleStateChange}
        snapPoints={['70%']}
      >
        <ContentWrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <BottomSheetView style={s.content}>
              <Text style={s.title}>{userId ? 'Editar' : 'Criar'} Cliente</Text>
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
                  {userId ? 'Editar' : 'Criar'} Cliente
                </Text>
              </Pressable>

              <Animated.View style={{ height: isIos ? height : 0 }} />
            </BottomSheetView>
          )}
        </ContentWrapper>
      </BottomSheet>
    );
  }
);

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
});
