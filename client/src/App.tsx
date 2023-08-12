import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Spaces,
  ProtectedRoute,
  Nav,
  WorkSpace,
  Login,
  Register,
  Invite,
  ForgotPassword,
  ResetPassword,
} from "./components";
import { ToastContainer } from "react-toastify";
import { authVerify } from "./utils/verifyToken";
import "react-toastify/dist/ReactToastify.css";
import { useAccountContext } from "./context/AccountContext";

export default function App() {
  const { hasAccount } = useAccountContext();
  const location = useLocation();
  const isAuthenticated = authVerify();

  useEffect(() => {
    const authenticate = authVerify();
    localStorage.setItem("isAuthenticated", JSON.stringify(authenticate));
  }, [location]);

  return (
    <div className="bg-fade-blue">
      {location.pathname === "/" && isAuthenticated && <Nav />}
      {location.pathname === "/invite" && <Nav />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute user={isAuthenticated} redirectPath={"/login"}>
              <Spaces />
            </ProtectedRoute>
          }
        />

        <Route
          path="/spaces/:space"
          element={
            <ProtectedRoute user={isAuthenticated} redirectPath={"/"}>
              <WorkSpace />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
        <Route path="/invite" element={<Invite />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
