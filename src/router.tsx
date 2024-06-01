import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Admin } from "./pages/Admin/Admin";
import AdminRessourcesList from "./pages/Admin/AdminRessourcesList/AdminRessourcesList";
import AdminCommentsList from "./pages/Admin/AdminCommentsList/AdminCommentsList";
import AdminUser from "./pages/Admin/AdminUser/AdminUser";
import CreateUser from "./pages/Admin/AdminUser/CreateUser/CreateUser";
import UserManagement from "./pages/Admin/AdminUser/UserManagement/UserManagement";
import AdminRessources from "./pages/Admin/AdminRessources/AdminRessources";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Resource from "./pages/Resource/Resource";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { User } from "./pages/User/User";
import Account from "./pages/User/Account/Account";
import Favorite from "./pages/User/Favorite/Favorite";
import Archive from "./pages/User/Archive/Archive";
import MyResources from "./pages/User/MyResources/MyResources";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        element: (
          <ProtectedRoute allowedRoles={[1, 2]}>
            <Admin />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "ressources",
            element: <AdminRessourcesList />,
          },
          {
            path: "comments",
            element: <AdminCommentsList />,
          },
          {
            path: "users",
            element: <AdminUser />,
            children: [
              {
                path: "create",
                element: <CreateUser />,
              },
              {
                path: "manage",
                element: <UserManagement />,
              },
            ],
          },
          {
            path: "manageRessources",
            element: <AdminRessources />,
          },
        ],
      },
      {
        path: "/resource/:id",
        element: <Resource />,
      },
      {
        path: "/resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/user",
        element: <User />,
        children: [
          {
            path: "archive",
            element: <Archive />,
          },
          {
            path: "favorite",
            element: <Favorite />,
          },
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "myresources",
            element: <MyResources />,
          },
        ],
      },
    ],
  },
]);
