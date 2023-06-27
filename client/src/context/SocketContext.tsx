import React, { useContext, useEffect, useState } from "react";
import { ProviderProp } from "../types";
import socket from "../socket/socket";
import { useAccountContext } from "./AccountContext";
import { Socket } from "socket.io-client";
import { getUserDetails } from "../utils/getUserDetails";

interface GlobalSocket {
  socket: Socket | null;
  onlineUsers: any[];
  hasNewMessage: boolean;
  setOnlineUsers: React.Dispatch<React.SetStateAction<any[]>>
}

interface SocketProvider extends ProviderProp {}

const SocketContext = React.createContext<GlobalSocket>({} as GlobalSocket);

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }: SocketProvider) => {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [user_details] = useState(getUserDetails());
  const [hasNewMessage, setHasNewMessage] = useState(false)

  useEffect(() => {
    if (user_details) {
      socket.auth = {
        sessionID: user_details.userId,
        userID: user_details.userId,
      };
      socket.connect();
    }

    socket.on("session", ({ sessionID, userID }) => {
      socket.auth = { sessionID };
      socket.userID = userID;
    });

    socket.on("connect_error", (err) => {});

    return () => {
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      if (onlineUsers.length > 0) {
        setOnlineUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userID.toString() === user_details.userId.toString()
              ? { ...user, connected: true }
              : user
          )
        );
      }
    });

    socket.on("disconnect", () => {});

    socket.on("users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("user connected", (userData) => {
      if (onlineUsers.length > 0) {
        setOnlineUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userID.toString() === userData.userID.toString()
              ? { ...user, connected: true }
              : user
          )
        );
      }
    });

    socket.on("user disconnected", (id) => {
      if (onlineUsers.length > 0) {
        setOnlineUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userID.toString() === id.toString()
              ? { ...user, connected: false }
              : user
          )
        );
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      //socket.off("private message");
    };
  }, [user_details, onlineUsers]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, hasNewMessage, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
