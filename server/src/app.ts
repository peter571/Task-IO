import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";

import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import messageRoutes from "./routes/message";
import spaceRoutes from "./routes/space";
import chatsRoutes from "./routes/chat"
import { users } from "./socket";
import { connectDB } from './database/database'

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
app.use("/chats", chatsRoutes)

app.get("/", (req, res) => {
  res.send("<h1>Task manager API</h1>");
});

//DATABASE CONNECTION
const CONNECTION_URL = `${process.env.MONGO_URL}`;
connectDB(CONNECTION_URL)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);

//SOCKET IO
const io = new Server(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}`
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  if (id) {
    console.log(`User with id: ${id} connected!`);
    socket.join(id);
    if (typeof id === 'string') {
      users.addUser(id);
      console.log('User added!')
      io.emit("get-users", users.getUsers());
      console.log(users.getUsers())
    }
  }

  socket.on(
    "send-message",
    ({ recipients, message, createdAt, senderAvatar }) => {
      recipients.forEach((recipient: any) => {
        const newRecipients = recipients.filter((r: any) => r !== recipient);
        newRecipients.push(id);
        socket.broadcast.to(recipient).emit("receive-message", {
          recipients: newRecipients,
          sender: id,
          message,
          createdAt,
          senderAvatar,
        });
      });
    }
  );

  socket.on("disconnect", () => {
    console.log(`User with id: ${id} disconnected!`);
    if (typeof id === 'string') {
      users.removeUser(id);
      console.log('User removed!')
      io.emit("get-users", users.getUsers());
    }
  })
});
