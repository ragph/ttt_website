import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials, RegisterCredentials, AuthResponse } from './types';
import { authApi } from '../../api/authApi';

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  }
);

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: string }
>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.register(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Registration failed'
      );
    }
  }
);

export const forgotPassword = createAsyncThunk<
  { message: string },
  { email: string },
  { rejectValue: string }
>(
  'auth/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(data.email);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Request failed'
      );
    }
  }
);
