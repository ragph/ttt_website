import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState, ThemeMode } from './types';
import { THEME_STORAGE_KEY, loadFromLocalStorage, saveToLocalStorage } from '../../utils';

const savedTheme = loadFromLocalStorage<{ mode: ThemeMode }>(THEME_STORAGE_KEY);

const initialState: ThemeState = {
  mode: savedTheme?.mode || 'light',
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
  },
});

export const { toggleTheme, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
