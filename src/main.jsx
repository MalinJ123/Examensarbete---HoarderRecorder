import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'

import { Router } from './RouteConfig'
import { ContextRoot } from './ContextRoot'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextRoot>
      <RouterProvider router={Router} />
    </ContextRoot>
  </React.StrictMode>,
)