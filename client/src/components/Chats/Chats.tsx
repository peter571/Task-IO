import React from 'react'
import Chat from './Chat'
import pic from '../../assets/somepic.png'
import { useNavigate } from 'react-router-dom';

export default function Chats() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 h-screen">
      <div className='basis-1/8'>
        <h1 className="logo" onClick={() => navigate("/")}>
          Task Manager
        </h1>
      </div>
      <h1 className="font-bold basis-1/8">Chats</h1>
      <div className="basis-3/4 flex flex-col gap-2 overflow-auto">
        <Chat
          profileImage={pic}
          userName={"Koecha"}
          previewText={"Hey Koecha"}
        />
      </div>

      <div className=''>
        <button className="btn">New user</button>
      </div>
    </div>
  );
}
