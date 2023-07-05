import { io } from "socket.io-client";
import { ISocket } from "../types";

const URL = import.meta.env.MODE === 'production' ? "https://task-io-socket-server-2pqqdimvsq-uc.a.run.app" : "http://localhost:7000";

const socket: ISocket = io(URL, {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  //console.log(event, args);
});

export default socket;
