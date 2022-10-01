import React, { useContext, useEffect, useState } from "react";
import { ProviderProp } from "../types";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../hooks/hook";
import { userSelector } from "../features/users/userSlice";

interface GlobalSocket {
  socket: Socket | null;
}

interface SocketProvider extends ProviderProp {}

const SocketContext = React.createContext<GlobalSocket>({} as GlobalSocket);

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }: SocketProvider) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAppSelector(userSelector);

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:5000", {
        query: { id: user.userId },
      });
      setSocket(newSocket);
      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
