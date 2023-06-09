import React, { useContext, useEffect, useState } from "react";
import { ProviderProp } from "../types";
import { io, Socket } from "socket.io-client";
import { useAccountContext } from "./AccountContext";

interface GlobalSocket {
  socket: Socket | null;
  onlineUsers: string[];
}

interface SocketProvider extends ProviderProp {}

const SocketContext = React.createContext<GlobalSocket>({} as GlobalSocket);

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }: SocketProvider) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useAccountContext();

  useEffect(() => {
    if (user) {
      const newSocket = io("https://chat-app-vpct.onrender.com", {
        query: { id: user.userId },
      });
      setSocket(newSocket);
      socket?.on('get-users', (users) => {
        setOnlineUsers(users);
      })
      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
