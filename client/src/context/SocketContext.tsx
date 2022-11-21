import React, { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ProviderProp } from "../types";

interface ISocket extends Socket {
  userID?: string;
  sessionID?: string;
}

interface GlobalSocket {
  onlineUsers: string[];
  setOnlineUsers: React.Dispatch<React.SetStateAction<any[]>>
  socket: ISocket
}

interface SocketProvider extends ProviderProp {}

const SocketContext = React.createContext<GlobalSocket>({} as GlobalSocket);

export function useSocket() {
  return useContext(SocketContext);
}

const URL = 'http://localhost:5000'
const url = 'https://chat-app-vpct.onrender.com'

export const SocketProvider = ({ children }: SocketProvider) => {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const socket = io(URL, { autoConnect: false });

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
