import React from "react";
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
  PersistAuth,
} from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "hooks/redux";
import { selectCurrentToken } from "features/api/authSlice";

export default function App() {
  const location = useLocation();
  const token = useAppSelector(selectCurrentToken);

  return (
    <div className="bg-fade-blue">
      {location.pathname === "/" && token && <Nav />}
      {location.pathname === "/invite" && <Nav />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<PersistAuth />}>
          <Route
            path="/"
            element={
              <ProtectedRoute redirectPath={"/login"}>
                <Spaces />
              </ProtectedRoute>
            }
          />

          <Route
            path="/spaces/:space"
            element={
              <ProtectedRoute redirectPath={"/login"}>
                <WorkSpace />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
        <Route path="/invite" element={<Invite />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
