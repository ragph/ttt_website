import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL, API_TIMEOUT, AUTH_STORAGE_KEY, loadFromLocalStorage } from '../utils';

// Create axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
axiosClient.interceptors.request.use(
  (config: any) => {
    const auth = loadFromLocalStorage<{ token: string }>(AUTH_STORAGE_KEY);

    if (auth && auth.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem(AUTH_STORAGE_KEY);
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden: You do not have permission to access this resource');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Internal server error');
          break;
        default:
          console.error('An error occurred:', error.response.data);
      }
    } else if (error.request) {
      console.error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
