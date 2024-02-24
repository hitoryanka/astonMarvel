import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { createContext, useMemo, useState } from 'react';
import { getTheme, useThemeUpdate } from './lib';

type ThemeContext = [
  'light' | 'dark',
  React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
];

export const themeContext = createContext<ThemeContext>([
  'light',
  (): void => {},
]);

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getTheme());
  useThemeUpdate(theme);

  const contextValue: ThemeContext = useMemo(
    () => [theme, setTheme],
    [theme],
  );

  return (
    <Provider store={store}>
      <themeContext.Provider value={contextValue}>
        <RouterProvider router={router} />
      </themeContext.Provider>
    </Provider>
  );
}

export default App;
