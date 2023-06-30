// import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cafe from './pages/cafe';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Employee from './pages/employee';
import Home from './pages/home';
// import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path:'/cafes',
    element:<Cafe />
  },
  {
    path: '/employees',
    element: <Employee />
  }
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);