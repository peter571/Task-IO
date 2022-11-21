import { UserAvatar } from "./UserAvatar";
import { MessagesList } from "./MessagesList";
import { TextInput } from "./TextInput";
import React, { useEffect, useState } from "react";
import {
  messageSelector,
  getConversations,
} from "../../features/message/messageSlice";
import { spacesSelector } from "../../features/spaces/spaceSlice";
import { userSelector } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { io, Socket } from "socket.io-client";
import { useSocket } from "../../context/SocketContext";

const URL = 'http://localhost:5000'
const url = 'https://chat-app-vpct.onrender.com'

export default function Messages() {
  const { spaceMembers } = useAppSelector(spacesSelector);
  const { selectedUserId, user } = useAppSelector(userSelector);
  const { messages } = useAppSelector(messageSelector);
  const dispatch = useAppDispatch();
  const selectedUser = spaceMembers.find(
    (user) => user.userId === selectedUserId
  );

  const { setOnlineUsers, socket } = useSocket();

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    })

  }, []);

  useEffect(() => {
    if (user && selectedUserId) {
      dispatch(getConversations({ from: user.userId, to: selectedUserId }));
    }
  }, [selectedUserId]);

  if (!selectedUserId)
    return (
      <div className="basis-1/2 px-3 h-full relative">
        <p>Open Conversation</p>
      </div>
    );

  return (
    <div className="basis-1/2 h-full flex flex-col">
      <UserAvatar selectedUser={selectedUser} />
      <MessagesList messages={messages} />
      <TextInput />
    </div>
  );
}
