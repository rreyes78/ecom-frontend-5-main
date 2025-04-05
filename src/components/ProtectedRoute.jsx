import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
const { token } = useAuth();
  return token ? <Navigate to="/home" /> : children;
};

export default ProtectedRoute;
