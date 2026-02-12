import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeConfig } from './theme';
import { routes } from './routes';
import { useStoreHydration } from './hooks/useStoreHydration';

function AppContent() {
  const routing = useRoutes(routes);

  // Hydrate store from localStorage after initial render
  useStoreHydration();

  // Dispatch render-event after app is fully mounted and styled
  useEffect(() => {
    // Wait for next frame to ensure styles are injected
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Hide the loading screen
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
      });
    });
  }, []);

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
