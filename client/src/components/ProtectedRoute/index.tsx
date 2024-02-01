import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentToken } from "../../features/api/authSlice";
import { useAppSelector } from "../../hooks/redux";
import { useAccountContext } from "../../context/AccountContext";

interface RoutesProps {
  redirectPath: string;
  children?: React.ReactNode;
}

const ProtectedRoute = ({ redirectPath = "/", children }: RoutesProps) => {
  const { user } = useAccountContext()

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
