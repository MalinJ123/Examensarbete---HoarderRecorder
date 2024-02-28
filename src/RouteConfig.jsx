import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root.jsx";
import Start from "./routes/Start";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    children: [
      {
        path: "",
        element: <Start />,
      },
    ],
  },
]);