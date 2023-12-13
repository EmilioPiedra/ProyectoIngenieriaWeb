import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Home from './rutas/Home';
import Login from './rutas/Login';
import Signup from './rutas/Signup';
import RutaProtejida from './rutas/RutaProtejita';
import Dashboard from './rutas/Dashboard';


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
    element: <RutaProtejida />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard/>,
      }
    ]
  },
];


// Crear el enrutador usando createBrowserRouter
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
