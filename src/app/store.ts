import { configureStore } from '@reduxjs/toolkit';
import authReducer, { rehydrateAuth } from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Rehydrate auth state from localStorage on app start
store.dispatch(rehydrateAuth());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
