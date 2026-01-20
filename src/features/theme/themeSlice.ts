import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState, ThemeMode } from './types';
import { THEME_STORAGE_KEY, loadFromLocalStorage, saveToLocalStorage } from '../../utils';

// Always use default state to avoid hydration mismatch
// Theme will be loaded from localStorage after hydration via hydrateTheme action
const initialState: ThemeState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      saveToLocalStorage(THEME_STORAGE_KEY, { mode: state.mode });
    },
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      saveToLocalStorage(THEME_STORAGE_KEY, { mode: state.mode });
    },
    hydrateTheme: (state) => {
      const savedTheme = loadFromLocalStorage<{ mode: ThemeMode }>(THEME_STORAGE_KEY);
      if (savedTheme?.mode) {
        state.mode = savedTheme.mode;
      }
    },
  },
});

export const { toggleTheme, setThemeMode, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;
