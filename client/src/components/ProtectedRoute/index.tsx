import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentToken } from "../../features/api/authSlice";
import { useAppSelector } from "../../hooks/redux";

interface RoutesProps {
  redirectPath: string;
  children?: React.ReactNode;
}

const ProtectedRoute = ({ redirectPath = "/", children }: RoutesProps) => {
  const token = useAppSelector(selectCurrentToken);

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
