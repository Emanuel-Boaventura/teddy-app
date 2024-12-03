import { ActivityIndicator } from 'react-native-paper';

interface ILoader {
  size?: number;
  color?: string;
  shrink?: boolean;
}

export function Loader({ size = 48, color = '#EB6625', shrink }: ILoader) {
  return (
    <ActivityIndicator
      size={size}
      color={color}
      style={shrink ? {} : { flex: 1 }}
    />
  );
}
