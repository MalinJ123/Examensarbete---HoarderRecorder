import React from "react";
import { createHashRouter } from "react-router-dom";

// Root
import { Root } from "./routes/Root.jsx";

// Error
import { Error } from "./routes/Error.jsx";

// Start/Category
import { Start } from "./routes/Start";
import { AddCategory } from "./routes/AddCategory.jsx";
import { EditCategory } from "./routes/EditCategory.jsx";

// User
import { User } from "./routes/User.jsx";
import { Authentication } from "./routes/Authentication.jsx";
import { DeleteAccount } from "./routes/DeleteAccount.jsx";

// Object
import { AddObject } from "./routes/AddObject.jsx";
import { Object } from "./routes/Object.jsx";
import {ShowObject } from "./routes/ShowObject.jsx";
import { EditObject } from "./routes/EditObject.jsx";

export const Router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Authentication />,
      },

      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/delete-account",
        element: <DeleteAccount />,
      },

      {
        path: "/start",
        element: <Start />,
      },
      {
        path: "/add-category",
        element: <AddCategory />,
      },
      {
        path: "/edit-category/:id",
        element: <EditCategory />,
      },
      {
        path: "/object/:id",
        element: <Object />,
      },
      {
        path: "/add-object/:id",
        element: <AddObject />,
      },
      {
        path: "/show-object",
        element: <ShowObject />,
      },
      {
        path: "/edit-object",
        element: <EditObject />,
      }
    ],
    errorElement: <Error />
  },
]);
