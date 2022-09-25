import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Chats, Messages, Tasks, Spaces } from "./components";
import { Login, Register } from "./features";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [hasAccount, setHasAccount] = useState(true);
  return (
    <div>
      <Routes>
      <Route path="/" element={hasAccount ? <Login /> : <Register />} />
      <Route path="/main" element={<Main />} />
      <Route path="/spaces" element={<Spaces />} />
    </Routes>
      <ToastContainer />
    </div>
  );
}
