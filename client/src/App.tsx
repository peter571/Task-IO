import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Spaces,
  ProtectedRoute,
  Nav,
  WorkSpace,
  Login,
  Register,
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
    <div className="">
      {location.pathname === "/spaces" && <Nav />}
      {location.pathname === "/" && <Nav />}

      <Routes>
        <Route
          path="/spaces"
          element={
            <ProtectedRoute user={isAuthenticated} redirectPath={"/"}>
              <Spaces />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={!hasAccount ? <Login /> : <Register />} />
        <Route
          path="/spaces/:spaceId"
          element={
            <ProtectedRoute user={isAuthenticated} redirectPath={"/"}>
              <WorkSpace />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
