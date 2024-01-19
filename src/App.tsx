import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider } from 'react-router-dom';

// TODO try adding loaders to routes

import { Header } from './components/header/Header';
import './styles.css';
import { router } from './router';
function App() {
  return (
    <Provider store={store}>
      <Header />
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
