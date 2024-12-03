import { ActivityIndicator } from 'react-native';

interface ILoader {
  size?: number;
  color?: string;
  shrink?: boolean;
}

export function Loader({ size = 48, color = '#EB6625', shrink }: ILoader) {
  return (
    <ActivityIndicator
      testID='loader'
      size={size}
      color={color}
      style={shrink ? {} : { flex: 1 }}
    />
  );
}
