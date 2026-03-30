import { useEffect, useRef } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeConfig } from './theme';
import { routes } from './routes';
import { useStoreHydration } from './hooks/useStoreHydration';
import Lenis from 'lenis';

function AppContent() {
  const routing = useRoutes(routes);
  const location = useLocation();
  const loaderHidden = useRef(false);

  // Hydrate store from localStorage after initial render
  useStoreHydration();

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Hide loader once - after first route renders
  useEffect(() => {
    if (loaderHidden.current) return;

    const hideLoader = () => {
      const loader = document.getElementById('app-loader');
      const root = document.getElementById('root');

      // Wait for meta tags to be set by page components (useEffect)
      // This ensures pre-rendering captures dynamic meta tags
      setTimeout(() => {
        // Dispatch event for prerenderer FIRST (before showing content)
        document.dispatchEvent(new Event('render-event'));

        // Then show the content (this won't be captured by prerenderer)
        if (loader) loader.classList.add('loaded');
        if (root) {
          root.classList.add('ready');
          root.style.setProperty('visibility', 'visible', 'important');
          root.style.setProperty('opacity', '1', 'important');
        }
        document.body.classList.add('hydrated');
        document.body.style.overflow = 'auto';

        // Remove loader after transition
        setTimeout(() => {
          if (loader) loader.remove();
        }, 300);
      }, 500);

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
