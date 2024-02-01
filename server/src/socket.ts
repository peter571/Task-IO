import { Server, Socket } from "socket.io";
import Redis from "ioredis";
import { RedisSessionStore } from "./sessionStore";
import { NextFunction } from "express";

interface ISocket extends Socket {
  sessionID?: string;
  userID?: string;
  username?: string;
}

export function setupSocket(httpServer: any): Server {
  const redisClient = new Redis({ port: 6379, host: "127.0.0.1" });
  const io = require("socket.io")(httpServer, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? "https://tasks-manager-io.netlify.app"
          : "http://localhost:5173",
    },
    adapter: require("socket.io-redis")({
      pubClient: redisClient,
      subClient: redisClient.duplicate(),
    }),
  });

  const sessionStore = new RedisSessionStore(redisClient);
  /**Socket IO implementation*/
  //Middeware
  io.use(async (socket: ISocket, next: NextFunction) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      const session = await sessionStore.findSession(sessionID);
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        return next();
      }
    }
    const userID = socket.handshake.auth.userID;
    if (!userID) return next(new Error("invalid user ID"));

    socket.userID = userID;
    socket.sessionID = userID;
    next();
  });

  io.on("connection", async (socket: ISocket) => {
    // persist session
    sessionStore.saveSession(socket.sessionID!, {
      userID: socket.userID,
      connected: true,
    });

    // emit session details
    socket.emit("session", {
      sessionID: socket.sessionID,
      userID: socket.userID,
    });

    // join the "userID" room
    socket.join(socket.userID!);

    // fetch existing users
    const users: any[] = [];
    const [sessions] = await Promise.all([sessionStore.findAllSessions()]);

    sessions.forEach((session) => {
      users.push({
        userID: session.userID,
        connected: session.connected,
      });
    });

    socket.emit("users", users);

    // notify existing users
    socket.broadcast.emit("user connected", {
      userID: socket.userID,
      connected: true,
      // messages: [],
    });

    // forward the private message to the right recipient (and to other tabs of the sender)
    socket.on("private message", (data) => {
      socket.to(data.receiver._id).emit("private message", data);
      //socket.emit("private message", data);
    });

    // notify users upon disconnection
    socket.on("disconnect", async () => {
      const matchingSockets = await io.in(socket.userID!).allSockets();
      const isDisconnected = matchingSockets.size === 0;

      if (isDisconnected) {
        // notify other users
        socket.broadcast.emit("user disconnected", socket.userID);
        // update the connection status of the session
        sessionStore.saveSession(socket.sessionID!, {
          userID: socket.userID,
          connected: false,
        });
      }
    });
  });

  return io;
}
