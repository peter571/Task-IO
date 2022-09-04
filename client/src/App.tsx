import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Chats, Login, Messages, Tasks, Spaces } from "./components";

const Main = () => {
  const navigate = useNavigate();

  return (    
      <div className="flex flex-row p-5 gap-4 h-screen">
        <Chats />
        <Messages />
        <Tasks />
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
