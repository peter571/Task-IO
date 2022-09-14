import React from "react";
import { Routes, Route } from "react-router-dom";
import { Chats, Login, Messages, Tasks, Spaces } from "./components";

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
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/spaces" element={<Spaces />} />
    </Routes>
  );
}
