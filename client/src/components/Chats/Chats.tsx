import React from "react";
import Chat from "./Chat";
import pic from "../../assets/somepic.png";
import { useNavigate } from "react-router-dom";

export default function Chats() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 h-screen">
      <div className="basis-1/8">
        <h1 className="logo" onClick={() => navigate("/")}>
          Task Manager
        </h1>
      </div>
      <h1 className="font-bold basis-1/8">Chats</h1>
      <div className="basis-3/4 flex flex-col gap-2 overflow-auto">
        {users.map((user, index) => (
          <Chat
          key={index}
          profileImage={user.img}
          userName={user.name}
          previewText={user.text}
        />
        ))}
      </div>

      <div className="">
        <button className="btn">New user</button>
      </div>
    </div>
  );
}

export const users = [
  { name: "koecha", text: "Hey koecha", img: pic },
  { name: "Peter", text: "Hey koecha", img: pic },
  { name: "Kip", text: "Hey koecha", img: pic },
  { name: "Joe", text: "Hey koecha", img: pic },
  { name: "Doe", text: "Hey koecha", img: pic },
  { name: "Kevin", text: "Hey koecha", img: pic },
  { name: "John", text: "Hey koecha", img: pic },
];
