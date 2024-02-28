import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from './routes/Root.jsx';
import Start from './routes/Start';
import User from './routes/User.jsx';


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '', 
        element: <Start />,
      },
      {
        path: 'user',
        element: <User/>,
      },
    ],
  },
]);