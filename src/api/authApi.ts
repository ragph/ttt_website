import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // In production, this would call the real API endpoint
    // For demo purposes, we'll simulate a successful login

    // return axiosClient.post('/auth/login', credentials);

    // MOCK RESPONSE - Remove this in production
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: credentials.email,
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
            role: 'Admin',
          },
          token: 'mock-jwt-token-' + Date.now(),
          message: 'Login successful',
        });
      }, 1000);
    });
  },

  /**
   * Register new user
   */
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    // In production, this would call the real API endpoint
    // return axiosClient.post('/auth/register', credentials);

    // MOCK RESPONSE - Remove this in production
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: credentials.email,
            name: credentials.name,
            avatar: 'https://i.pravatar.cc/150?img=2',
            role: 'User',
          },
          token: 'mock-jwt-token-' + Date.now(),
          message: 'Registration successful',
        });
      }, 1000);
    });
  },

  /**
   * Forgot password
   */
  forgotPassword: async (_email: string): Promise<{ message: string }> => {
    // In production, this would call the real API endpoint
    // return axiosClient.post('/auth/forgot-password', { email: _email });

    // MOCK RESPONSE - Remove this in production
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: 'Password reset link sent to your email',
        });
      }, 1000);
    });
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    // In production, you might want to invalidate the token on the server
    // return axiosClient.post('/auth/logout');
    return Promise.resolve();
  },
};
