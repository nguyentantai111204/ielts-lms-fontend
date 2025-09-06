// RequiredRole.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/Context/AuthContext";

const RequiredRole = ({ allowedRoles = [], children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default RequiredRole;
