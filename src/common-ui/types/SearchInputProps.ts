export interface SearchInputProps {
  value?: string;
  onValueChange?: (value: string) => void;
  themeStyle?: 'dark' | 'light';
  placeholder?: string;
  autoFocus?: boolean;
  right?: React.ReactNode;
  enablesReturnKeyAutomatically?: boolean;
  onSearchPress?: (value: string) => void;
}
