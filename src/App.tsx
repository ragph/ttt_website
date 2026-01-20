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
