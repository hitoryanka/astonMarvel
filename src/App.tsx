import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { createContext, useEffect, useState } from 'react';

export const themeContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(['light', (): void => {}]);

function App() {
  const [theme, setTheme] = useState<string>(getTheme());

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Provider store={store}>
      <themeContext.Provider value={[theme, setTheme]}>
        <RouterProvider router={router} />
      </themeContext.Provider>
    </Provider>
  );
}

export default App;

const getTheme = (): string => {
  return localStorage.getItem('theme') ?? 'light';
};
