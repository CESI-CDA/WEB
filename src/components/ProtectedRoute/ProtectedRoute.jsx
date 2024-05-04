import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context";

function ProtectedRoute({ children, id }) {
  const { user } = useContext(AuthContext);
  return user.id == id ? children : <Navigate to="/" />;
  //todo page unauthorized
}

export default ProtectedRoute;
