import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from './types';
import { AUTH_STORAGE_KEY, loadFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../../utils';
import { loginUser, registerUser } from './authThunks';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      saveToLocalStorage(AUTH_STORAGE_KEY, {
        user: action.payload.user,
        token: action.payload.token,
      });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      removeFromLocalStorage(AUTH_STORAGE_KEY);
    },
    rehydrateAuth: (state) => {
      const savedAuth = loadFromLocalStorage<{ user: User; token: string }>(AUTH_STORAGE_KEY);
      if (savedAuth && savedAuth.user && savedAuth.token) {
        state.user = savedAuth.user;
        state.token = savedAuth.token;
        state.isAuthenticated = true;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        const savedAuth = loadFromLocalStorage<{ user: User; token: string }>(AUTH_STORAGE_KEY);
        if (savedAuth) {
          saveToLocalStorage(AUTH_STORAGE_KEY, {
            user: state.user,
            token: savedAuth.token,
          });
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      saveToLocalStorage(AUTH_STORAGE_KEY, {
        user: action.payload.user,
        token: action.payload.token,
      });
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      saveToLocalStorage(AUTH_STORAGE_KEY, {
        user: action.payload.user,
        token: action.payload.token,
      });
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { loginSuccess, logout, rehydrateAuth, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
