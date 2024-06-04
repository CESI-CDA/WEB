import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Admin } from "./pages/Admin/Admin";
import AdminRessourcesList from "./pages/Admin/AdminWaitingRessourcesList/AdminWaitingRessourcesList";
import AdminCommentsList from "./pages/Admin/AdminCommentsList/AdminCommentsList";
import AdminUser from "./pages/Admin/AdminUser/AdminUser";
import CreateUser from "./pages/Admin/AdminUser/CreateUser/CreateUser";
import UserManagement from "./pages/Admin/AdminUser/UserManagement/UserManagement";
import AdminRessources, {
  AdminRessourcesManagement,
} from "./pages/Admin/AdminRessourcesManagement/AdminRessourcesManagement";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Resource from "./pages/Resource/Resource";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { User } from "./pages/User/User";
import Account from "./pages/User/Account/Account";
import Favorite from "./pages/User/Favorite/Favorite";
import Archive from "./pages/User/Archive/Archive";
import MyResources from "./pages/User/MyResources/MyResources";
import CreateResource from "./pages/User/CreateResource/CreateResource";
import AdminWaitingRessourcesList from "./pages/Admin/AdminWaitingRessourcesList/AdminWaitingRessourcesList";

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
          <ProtectedRoute allowedRole={1}>
            <Admin />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "ressources",
            element: <AdminWaitingRessourcesList />,
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
                element: (
                  <ProtectedRoute allowedRole={1}>
                    <CreateUser />
                  </ProtectedRoute>
                ),
              },
              {
                path: "manage",
                element: <UserManagement />,
              },
            ],
          },
          {
            path: "manageRessources",
            element: <AdminRessourcesManagement />,
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
        element: (
          <ProtectedRoute allowedRole={1}>
            <User />
          </ProtectedRoute>
        ),
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
          {
            path: "createresource",
            element: <CreateResource />,
          },
        ],
      },
    ],
  },
]);
