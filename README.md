# TemplateReactTS_V1

A production-ready React + Vite + TypeScript admin dashboard template inspired by Modernize React Template, featuring complete Redux Toolkit setup, protected routing, theming, and a modular folder structure.

## Features

- ⚡ **Vite** - Lightning-fast development with HMR
- ⚛️ **React 18+** - Latest React features
- 🔷 **TypeScript** - Full type safety
- 🎨 **Material UI v6** - Beautiful, customizable components
- 🔐 **Authentication** - Complete auth flow with Redux and localStorage persistence
- 🛡️ **Protected Routes** - Secure route protection with React Router v6
- 🌓 **Dark Mode** - Built-in light/dark theme toggle
- 📦 **Redux Toolkit** - State management with typed hooks
- 🔌 **Axios** - HTTP client with interceptors for auth tokens
- 📱 **Responsive** - Mobile-first design
- 🎯 **Path Aliases** - Clean imports with `@/` prefix
- 📝 **ESLint** - Code quality enforcement

## Tech Stack

- **React 18+** - UI Library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Material UI v6** - Component library
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Emotion** - CSS-in-JS styling

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn installed

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Default Login

The authentication is currently using mock data. You can login with **any email and password**.

## Project Structure

```
📦 TemplateReactTS_V1
├── 📂 docs/                    # Documentation
├── 📂 public/                  # Static assets
├── 📂 src/
│   ├── 📂 api/                 # API layer (Axios)
│   │   ├── axiosClient.ts
│   │   ├── authApi.ts
│   │   └── userApi.ts
│   ├── 📂 app/                 # Redux store config
│   │   ├── store.ts
│   │   └── hooks.ts
│   ├── 📂 assets/              # Images, icons, styles
│   ├── 📂 components/          # Reusable components
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── widgets/
│   │   └── shared/
│   ├── 📂 features/            # Redux slices
│   │   ├── auth/
│   │   └── theme/
│   ├── 📂 layouts/             # Page layouts
│   │   ├── full/
│   │   └── blank/
│   ├── 📂 routes/              # Route configuration
│   │   ├── routes.tsx
│   │   └── ProtectedRoute.tsx
│   ├── 📂 theme/               # MUI theme config
│   ├── 📂 types/               # TypeScript types
│   ├── 📂 utils/               # Helper functions
│   ├── 📂 views/               # Page components
│   │   ├── authentication/
│   │   ├── dashboards/
│   │   ├── pages/
│   │   ├── tables/
│   │   └── charts/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Key Features

### 🔐 Authentication

- Complete login/register/forgot password flow
- Redux Toolkit for state management
- localStorage persistence
- Automatic token injection in API calls
- Protected routes with redirect

### 🎨 Theming

- Material UI v6 theming
- Light/Dark mode toggle
- Persistent theme preference
- Custom color palette
- Typography configuration

### 🛡️ Protected Routes

Routes are protected using the `ProtectedRoute` component:

```tsx
import { ProtectedRoute } from './routes';

<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

### 📡 API Integration

Axios is pre-configured with:

- Base URL configuration
- Auth token interceptors
- Error handling
- Request/response transformation

### 🔧 Redux Store

Typed Redux hooks for better DX:

```tsx
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const dispatch = useAppDispatch();
const user = useAppSelector((state) => state.auth.user);
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=TemplateReactTS_V1
VITE_APP_VERSION=1.0.0
```

## Customization

### Adding New Routes

1. Create your component in `src/views/`
2. Add the route in `src/routes/routes.tsx`
3. Update sidebar menu in `src/layouts/full/Sidebar.tsx`

### Modifying Theme

Edit theme configuration in `src/theme/`:
- `palette.ts` - Colors
- `typography.ts` - Font styles
- `shadows.ts` - Shadow definitions

### Adding Redux Slices

1. Create slice in `src/features/yourFeature/`
2. Add to store in `src/app/store.ts`
3. Use typed hooks from `src/app/hooks.ts`

## Production Deployment

### Build for production:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **Static Hosting**: Upload `dist/` folder

## API Integration

Replace the mock authentication in `src/api/authApi.ts` with your real API:

```typescript
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return axiosClient.post('/auth/login', credentials);
  },
  // ... other methods
};
```

## Security Notes

⚠️ **Important Security Considerations:**

1. The current authentication uses mock data - replace with real API
2. Store sensitive tokens securely (consider httpOnly cookies for production)
3. Implement proper CSRF protection
4. Add rate limiting for authentication endpoints
5. Use HTTPS in production
6. Validate and sanitize all user inputs
7. Keep dependencies updated

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation in `/docs`

## Acknowledgments

- Inspired by [Modernize React Template](https://adminmart.com/product/modernize-react-mui-dashboard/)
- Built with [Material UI](https://mui.com/)
- Powered by [Vite](https://vitejs.dev/)

---

Made with ❤️ using React + TypeScript + Vite
