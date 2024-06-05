import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole: number[];
}
function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return allowedRole.includes(user.role) ? children : <Navigate to="/unauthorized" />;
  //todo page unauthorized
}

export default ProtectedRoute;
