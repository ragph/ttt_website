import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeConfig } from './theme';
import { routes } from './routes';

function App() {
  const routing = useRoutes(routes);

  return (
    <Provider store={store}>
      <ThemeConfig>{routing}</ThemeConfig>
    </Provider>
  );
}

export default App;
