import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Home from './rutas/Home';
import Login from './rutas/Login';
import Signup from './rutas/Signup';
import RutaProtegida from './rutas/RutaProtegita';
import Dashboard from './rutas/Dashboard';
import { AuthProvider } from './auth/AuthProvider';
import ItemList from './rutas/ItemList';
import OrderStatus from './rutas/OrderStatus';
import LocationBike from './rutas/LocationBike';
import PayMetod from './rutas/PayMetod';


// Definir las rutas utilizando Remix
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/',
    element: <RutaProtegida />,  // Corregido el nombre del componente
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/ItemList",
        element: <ItemList />,
      },
      {
        path: "/OrderStatus",
        element: <OrderStatus />,
      },
      {
        path: "/LocationBike",
        element: <LocationBike />,
      }, {
        path: "/PayPage",
        element: <PayMetod />,
      }
    ]
  },
];


const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
