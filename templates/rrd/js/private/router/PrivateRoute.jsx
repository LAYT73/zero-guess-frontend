import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  // TODO: Replace with actual authentication logic
  const isAuthenticated = localStorage.getItem("auth_token") !== null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
