import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RoutesProps {
  user: boolean;
  redirectPath: string;
  children?: React.ReactNode;
}

const ProtectedRoute = ({
  user,
  redirectPath = "/",
  children,
}: RoutesProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
