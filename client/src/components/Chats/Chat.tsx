import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { getConversations } from "../../features/message/messageSlice";
import { selectUserById, userSelector } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { ChatProp } from "../../types";

export default function Chat(props: ChatProp) {
  const { userId } = props;
  const dispatch = useAppDispatch();
  const { selectedUserId, user } = useAppSelector(userSelector);
  const isSelected = selectedUserId === userId;
  const [lastMessage, setLastMessage] = useState("");

  const { onlineUsers } = useSocket();

  function selectUser(id: string) {
    dispatch(selectUserById(id));
  }

  const isOnline = onlineUsers.some((user) => user === userId);

  useEffect(() => {
    async function fetchTexts() {
      try {
        if (userId && user) {
          const textMsgs = await dispatch(
            getConversations({ from: user.userId, to: userId })
          ).unwrap();
          if (textMsgs.length > 0) {
            setLastMessage(textMsgs[textMsgs.length - 1].message);
          }
        }
      } catch (error) { }
    }
    fetchTexts();
  }, []);

  return (
    <div
      className={`relative ${isSelected && "bg-gray-200"
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
        className={`${props.isConnected ? "bg-green-500" : "bg-gray-200"
          } absolute h-3 w-3 left-3 rounded-[50%]`}
      ></div>
      {props.hasNewMessages && (
        <div className="bg-red-500 absolute h-3.5 w-3.5 right-3 rounded-[50%]">
          <h1 className="text-xs font-semibold text-center text-white"></h1>
        </div>
      )}
    </div>
  );
}
