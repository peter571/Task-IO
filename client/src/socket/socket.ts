import { io } from "socket.io-client";
import { ISocket } from "../types";

const URL = "http://localhost:7000";
const socket: ISocket = io(URL, {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  //console.log(event, args);
});

export default socket;
