import { StyleProp, Text, TextStyle } from 'react-native';

interface IMyText {
  children: React.ReactNode;
  size?: number;
  weight?: string;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function MyText({
  children,
  style = {},
  size = 14,
  weight = '400',
  color,
  ...props
}: IMyText) {
  return (
    <Text
      style={[
        {
          fontSize: size,
          fontFamily: weight,
          color: color,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
