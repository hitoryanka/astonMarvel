import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { createContext, useState } from 'react';
import { getTheme, useThemeUpdate } from './lib';

export const themeContext = createContext<
  [string, React.Dispatch<React.SetStateAction<'light' | 'dark'>>]
>(['light', (): void => {}]);

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getTheme());
  useThemeUpdate(theme);

  return (
    <Provider store={store}>
      <themeContext.Provider value={[theme, setTheme]}>
        <RouterProvider router={router} />
      </themeContext.Provider>
    </Provider>
  );
}

export default App;
