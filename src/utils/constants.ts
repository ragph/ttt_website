// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.earningwhiletravelling.com/api';

// Image base URL should point to the API server without /api suffix
// Example: https://api.earningwhiletravelling.com/api -> https://api.earningwhiletravelling.com
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.earningwhiletravelling.com/api';
export const API_IMAGE_BASE_URL = baseUrl.replace(/\/api$/, '');

export const API_TIMEOUT = 30000;

// Debug logging (remove after verification)
console.log('🔧 Environment Variables:');
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('API_BASE_URL:', API_BASE_URL);
console.log('API_IMAGE_BASE_URL:', API_IMAGE_BASE_URL);

// LocalStorage Keys
export const AUTH_STORAGE_KEY = 'auth';
export const THEME_STORAGE_KEY = 'theme';

// App Configuration
export const APP_NAME = 'TemplateReactTS_V1';
export const APP_VERSION = '1.0.0';

// Routes
export const ROUTES = {
  HOME: '/home',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  USERS_TABLE: '/tables/users',
  ANALYTICS: '/charts/analytics',
  UI_BUTTONS: '/ui-components/buttons',
  MAP: '/map',
} as const;

// Theme
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;
