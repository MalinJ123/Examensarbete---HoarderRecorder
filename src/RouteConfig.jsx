import React from 'react';
import { createHashRouter } from 'react-router-dom';
import Root from './routes/Root.jsx';
import Start from './routes/Start';
import User from './routes/User.jsx';
import { Authentication } from './routes/Authentication.jsx';
import AddCategory from './routes/AddCategory.jsx';


export const Router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Authentication />,
      },
      {
        path: '/start', 
        element: <Start />,
      },
      {
        path: '/user',
        element: <User/>,
      },
      {
        path: 'addcategory',
        element: <AddCategory/>,
      },
    ],
  },
]);