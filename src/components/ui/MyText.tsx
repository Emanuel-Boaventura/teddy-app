import { StyleProp, Text, TextStyle } from 'react-native';

type MyTextProps = {
  style?: StyleProp<TextStyle>;
  children: string;
};

export function MyText({ children, style }: MyTextProps) {
  return (
    <Text style={{ fontFamily: 'Inter_400Regular', ...(style as object) }}>
      {children}
    </Text>
  );
}
