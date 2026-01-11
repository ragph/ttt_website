export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  info: string;
  success: string;
}
