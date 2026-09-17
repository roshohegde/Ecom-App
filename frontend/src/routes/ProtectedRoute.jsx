import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (role && user.role !== role)
    return <Navigate to="/access-denied" replace />;
  return children;
}
