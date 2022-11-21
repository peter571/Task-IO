import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { Server, Socket } from "socket.io";

import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import messageRoutes from "./routes/message";
import spaceRoutes from "./routes/space";
import crypto from "crypto";
import { InMemorySessionStore } from "./socket/sessionStore";

const sessionStore = new InMemorySessionStore();

dotenv.config();
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cors({ origin: "*" }));

//Routes
app.use("/users", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/spaces", spaceRoutes);
app.use("/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Task manager API</h1>");
});

//DATABASE CONNECTION
const CONNECTION_URL = `${process.env.MONGO_URL}`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log("Database connected successfully!"))
  .catch((error) => console.log(`${error} did not connect`));

const server = app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);

//SOCKET IO
const io = new Server(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}`,
  },
});

interface UserSocket extends Socket {
  userID?: string;
  sessionID?: string;
}

const randomId = () => crypto.randomBytes(8).toString("hex");

io.use((socket: UserSocket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      return next();
    }
  }
  socket.sessionID = randomId();
  socket.userID = randomId();
  next();
});

io.on("connection", (socket: UserSocket) => {
  // persist session
  if (socket.sessionID && socket.userID) {
    sessionStore.saveSession(socket.sessionID, {
      userID: socket.userID,
      connected: true,
    });
  }

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // join the "userID" room
  if (socket.userID) {
    socket.join(socket.userID);
  }

  // fetch existing users
  const users: Array<any> = [];
  sessionStore.findAllSessions().forEach((session: any) => {
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
  });

  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.userID,
      to,
    };
    if (socket.userID)
      socket.to(to).to(socket.userID).emit("private message", message);
  });

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    let matchingSockets: Set<string>;
    let isDisconnected: boolean;

    if (socket.userID) {
      matchingSockets = await io.in(socket.userID).allSockets();
      isDisconnected = matchingSockets.size === 0;

      if (isDisconnected) {
        // notify other users
        socket.broadcast.emit("user disconnected", socket.userID);
        // update the connection status of the session
        if (socket.sessionID) {
          sessionStore.saveSession(socket.sessionID, {
            userID: socket.userID,
            connected: false,
          });
        }
      }
    }
  });
});
