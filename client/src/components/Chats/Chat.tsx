import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { ChatProp } from "../../types";
import { useAccountContext } from "../../context/AccountContext";

export default function Chat(props: ChatProp) {
  const { userId } = props;
  const { user } = useAccountContext();
  const isSelected = true;
  const [lastMessage, setLastMessage] = useState("");
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState([]);

  function selectUser(id: string) {
   
  }

  useEffect(() => {
    socket?.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  const isOnline = onlineUsers.some((user) => user === userId);

  useEffect(() => {
    async function fetchTexts() {
      try {
       
      } catch (error) {}
    }
    fetchTexts();
  }, []);

  return (
    <div
      className={`relative ${
        isSelected && "bg-gray-200"
      } flex flex-row align-middle gap-2 border cursor-pointer p-2 rounded-md hover:bg-gray-200`}
      onClick={() => selectUser(userId)}
    >
      <img
        className="h-10 w-10 rounded-[50%]"
        src={props.avatar}
        alt={props.name}
        loading="lazy"
      />
      <div>
        <h1 className="font-semibold">{props.name}</h1>
        <p className="font-light text-xs max-w-[95%] truncate">{lastMessage}</p>
      </div>
      <div
        className={`${
          isOnline ? "bg-green-500" : "bg-gray-200"
        } absolute h-3 w-3 left-3 rounded-[50%]`}
      ></div>
      <div className="bg-red-500 absolute h-3.5 w-3.5 right-3 rounded-[50%]">
        <h1 className="text-xs font-semibold text-center text-white">2</h1>
      </div>
    </div>
  );
}
