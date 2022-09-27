import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Chats, Messages, Tasks, Spaces, ProtectedRoute } from "./components";
import { Login, Register } from "./features";
import { ToastContainer } from "react-toastify";
import { authVerify } from "./utils/verifyToken";
import "react-toastify/dist/ReactToastify.css";
import { useAccountContext } from "./context/AccountContext";

const Main = () => {
  return (
    <div className="flex flex-row p-5 gap-4 h-screen">
      <Chats />
      <Messages />
      <Tasks />
    </div>
  );
};

export default function App() {
  const { hasAccount } = useAccountContext();
  const location = useLocation();
  const isAuthenticated = authVerify();

  useEffect(() => {
    const authenticate = authVerify();
    localStorage.setItem("isAuthenticated", JSON.stringify(authenticate));
  }, [location]);

  return (
    <div>
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
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
