# Setup Guide

This guide will help you set up and customize the TemplateReactTS_V1 admin template.

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=TemplateReactTS_V1
VITE_APP_VERSION=1.0.0
```

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app.

## Authentication Setup

The template includes mock authentication by default. To connect to a real API:

### 1. Update API Configuration

Edit `src/utils/constants.ts`:

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-api.com';
```

### 2. Replace Mock Auth

Update `src/api/authApi.ts` to use real API calls:

```typescript
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return axiosClient.post('/auth/login', credentials);
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    return axiosClient.post('/auth/register', credentials);
  },

  // ... other methods
};
```

### 3. Configure Token Storage

The template uses localStorage by default. For production, consider:

- **httpOnly Cookies**: More secure, but requires backend support
- **sessionStorage**: For session-based authentication
- **Secure localStorage**: With encryption

## Theme Customization

### Colors

Edit `src/theme/palette.ts` to customize colors:

```typescript
primary: {
  main: '#5D87FF',  // Your brand color
  light: '#ECF2FF',
  dark: '#4570EA',
},
```

### Typography

Edit `src/theme/typography.ts`:

```typescript
export const typography = {
  fontFamily: "'Your Custom Font', sans-serif",
  h1: {
    fontWeight: 600,
    fontSize: '2.25rem',
  },
  // ... other styles
};
```

### Shadows

Edit `src/theme/shadows.ts` to customize shadows.

## Adding New Pages

### 1. Create Page Component

Create a new file in `src/views/`:

```typescript
// src/views/pages/NewPage.tsx
import { Box, Typography } from '@mui/material';

const NewPage = () => {
  return (
    <Box>
      <Typography variant="h4">New Page</Typography>
    </Box>
  );
};

export default NewPage;
```

### 2. Add Route

Update `src/routes/routes.tsx`:

```typescript
const NewPage = lazy(() => import('../views/pages/NewPage'));

// Add to routes array
{
  path: '/new-page',
  element: (
    <SuspenseWrapper>
      <NewPage />
    </SuspenseWrapper>
  ),
},
```

### 3. Add to Sidebar

Update `src/layouts/full/Sidebar.tsx`:

```typescript
const menuItems: MenuItem[] = [
  // ... existing items
  {
    title: 'New Page',
    icon: <YourIcon />,
    href: '/new-page',
  },
];
```

## Redux State Management

### Creating a New Slice

1. **Create slice directory**:
```
src/features/newFeature/
  ├── newFeatureSlice.ts
  ├── types.ts
  └── index.ts
```

2. **Define types** (`types.ts`):
```typescript
export interface NewFeatureState {
  data: any[];
  loading: boolean;
  error: string | null;
}
```

3. **Create slice** (`newFeatureSlice.ts`):
```typescript
import { createSlice } from '@reduxjs/toolkit';

const initialState: NewFeatureState = {
  data: [],
  loading: false,
  error: null,
};

const newFeatureSlice = createSlice({
  name: 'newFeature',
  initialState,
  reducers: {
    // Your reducers
  },
});

export default newFeatureSlice.reducer;
```

4. **Add to store** (`src/app/store.ts`):
```typescript
import newFeatureReducer from '../features/newFeature/newFeatureSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    newFeature: newFeatureReducer, // Add here
  },
});
```

## API Integration

### Creating New API Endpoints

1. **Create API file** (`src/api/yourApi.ts`):
```typescript
import axiosClient from './axiosClient';

export const yourApi = {
  getItems: async () => {
    return axiosClient.get('/items');
  },

  createItem: async (data: any) => {
    return axiosClient.post('/items', data);
  },
};
```

2. **Use in components**:
```typescript
import { yourApi } from '@/api/yourApi';

const fetchData = async () => {
  try {
    const data = await yourApi.getItems();
    // Handle data
  } catch (error) {
    // Handle error
  }
};
```

## Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

Build and run:
```bash
docker build -t template-react .
docker run -p 3000:3000 template-react
```

## Best Practices

1. **Component Organization**: Keep components small and focused
2. **Type Safety**: Always define TypeScript types
3. **Error Handling**: Use try-catch blocks and display user-friendly errors
4. **Performance**: Use React.lazy for code splitting
5. **Security**: Sanitize user inputs, use HTTPS, keep dependencies updated
6. **Testing**: Write tests for critical functionality
7. **Documentation**: Document complex logic and API integrations

## Troubleshooting

### Port Already in Use

Change port in `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3001,
  },
});
```

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Ensure tsconfig is properly configured and all types are installed:
```bash
npm install --save-dev @types/node
```

## Need Help?

- Check the main [README.md](../README.md)
- Review example components in `src/views/`
- Check [Material UI Documentation](https://mui.com/)
- Review [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
