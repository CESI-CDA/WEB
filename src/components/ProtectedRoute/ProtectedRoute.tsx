import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: number[];
}
function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return allowedRoles.includes(user.role) ? children : <Navigate to="/" />;
  //todo page unauthorized
}

export default ProtectedRoute;
