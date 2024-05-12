import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { rootLoader } from "./loaders/rootLoader";
import { Admin } from "./pages/Admin/Admin";
import Resource from "./pages/Resource/Resource";
import Favorite from "./pages/Favorite/Favorite";
import Archive from "./pages/Archive/Archive";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/resource",
        element: <Resource />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/archive",
        element: <Archive />,
      },
      {
        path: "/resetpassword",
        element: <ResetPassword />,
      },
    ],
  },
]);
