import React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { userId } = useParams();
  const { currentUser } = useUserContext();

  if (!currentUser || currentUser?.user?.id != userId) {
    return <Navigate to={"/"} replace />;
  }

  if (currentUser?.user?.role !== "USER") {
    localStorage.removeItem("currentUser");
    window.location.replace("/");
  }

  return children || <Outlet />;
}
