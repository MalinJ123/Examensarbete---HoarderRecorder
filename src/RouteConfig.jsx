import React from 'react';
import { createHashRouter } from 'react-router-dom';
import Root from './routes/Root.jsx';
import Start from './routes/Start';
import User from './routes/User.jsx';

export const Router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      // Ska inte '' vara tillför registera och logga in?
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