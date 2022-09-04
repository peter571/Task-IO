import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Chats, Login, Messages, Tasks, Spaces } from "./components";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-5 h-screen">
      <div>
        <h1 className="logo" onClick={() => navigate("/")}>
          Task Manager
        </h1>
      </div>
      <div className="flex flex-row gap-4">
        <Chats />
        <Messages />
        <Tasks />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/spaces" element={<Spaces />} />
    </Routes>
  );
}
