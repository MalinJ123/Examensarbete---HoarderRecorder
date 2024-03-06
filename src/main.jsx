import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import './app.css';


import { Router } from './RouteConfig'
import { ContextRoot } from './ContextRoot'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextRoot>
      <RouterProvider router={Router} />
    </ContextRoot>
  </React.StrictMode>,
)