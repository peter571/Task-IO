import { io } from "socket.io-client";
import { ISocket } from "@/types";
import config from "config";

const URL =
  import.meta.env.MODE === "production"
    ? config.LIVE_API_URL
    : config.DEV_API_URL;

const socket: ISocket = io(URL, {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  //console.log(event, args);
});

export default socket;
