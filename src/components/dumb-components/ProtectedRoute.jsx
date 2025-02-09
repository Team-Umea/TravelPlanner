import React from "react";
import useAuthStore from "../../hooks/useAuthStore";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;
}
