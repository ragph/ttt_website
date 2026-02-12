import { useEffect, useRef } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeConfig } from './theme';
import { routes } from './routes';
import { useStoreHydration } from './hooks/useStoreHydration';

function AppContent() {
  const routing = useRoutes(routes);
  const location = useLocation();
  const loaderHidden = useRef(false);

  // Hydrate store from localStorage after initial render
  useStoreHydration();

  // Hide loader once - after first route renders
  useEffect(() => {
    if (loaderHidden.current) return;

    const hideLoader = () => {
      const loader = document.getElementById('app-loader');
      const root = document.getElementById('root');

      if (loader) loader.classList.add('loaded');
      if (root) root.classList.add('ready');

      // Wait for meta tags to be set by page components (useEffect)
      // This ensures pre-rendering captures dynamic meta tags
      setTimeout(() => {
        // Dispatch event for prerenderer
        document.dispatchEvent(new Event('render-event'));
      }, 100);

      // Remove loader after transition
      setTimeout(() => {
        if (loader) loader.remove();
      }, 300);

      loaderHidden.current = true;
    };

    // Use requestIdleCallback for better timing, or fallback to setTimeout
    if ('requestIdleCallback' in window) {
      (window as Window).requestIdleCallback(hideLoader, { timeout: 500 });
    } else {
      setTimeout(hideLoader, 50);
    }
  }, [location.pathname]);

  return <ThemeConfig>{routing}</ThemeConfig>;
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
