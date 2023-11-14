import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

export default function AdminProtectedRouter({ children }) {
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return <Navigate to={"/"} replace />;
  }

  if (currentUser?.user?.role?.toUpperCase() !== "ADMIN") {
    return <Navigate to="*" replace />;
  }
  return children || <Outlet />;
}
