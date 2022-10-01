import React, { useContext, useEffect, useState } from "react";
import { ProviderProp } from "../types";
import { io, Socket } from "socket.io-client";

interface GlobalSocket {
  socket: Socket | null;
}

interface SocketProvider extends ProviderProp {
  id: string;
}

const SocketContext = React.createContext<GlobalSocket>({} as GlobalSocket);

export function useSocket() {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children, id }: SocketProvider) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
