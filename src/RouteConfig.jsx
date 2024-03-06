import React from "react";
import { createHashRouter } from "react-router-dom";

import Root from "./routes/Root.jsx";
import Start from "./routes/Start";
import User from "./routes/User.jsx";
import { Authentication } from "./routes/Authentication.jsx";
import { DeleteAccount } from "./routes/DeleteAccount.jsx";
import AddCategory from "./routes/AddCategory.jsx";
import Object from "./routes/Object.jsx";
import { EditCategory } from "./routes/EditCategory.jsx";

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
        path: "/start",
        element: <Start />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/add-category",
        element: <AddCategory />,
      },
      {
        path: "/delete-account",
        element: <DeleteAccount />,
      },
      {
        path: "/object",
        element: <Object />,
      },
      {
        path: "/edit-category",
        element: <EditCategory />,
      },
    ],
  },
]);
