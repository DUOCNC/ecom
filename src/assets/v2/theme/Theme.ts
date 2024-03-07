export interface ThemeProperty {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
}

export interface Theme {
  dark: ThemeProperty;
  light: ThemeProperty;
}
