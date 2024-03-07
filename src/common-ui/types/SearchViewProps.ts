import {GestureResponderEvent} from 'react-native';

export interface SearchViewProps {
  themeStyle?: 'dark' | 'light';
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  right?: React.ReactNode;
}
