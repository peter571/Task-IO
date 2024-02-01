// app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import messageRoutes from "./routes/message";
import spaceRoutes from "./routes/space";
import chatsRoutes from "./routes/chat";
import noteRoutes from "./routes/note";

export function setupApp(): express.Application {
  dotenv.config();
  const app = express();

  app.use(express.json({ limit: "10mb" }));
  app.use(
    express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
  );
  app.use(cors(corsOptions));
  app.use(cookieParser());

  // Routes
  app.use("/auth", authRoutes);
  app.use("/tasks", taskRoutes);
  app.use("/spaces", spaceRoutes);
  app.use("/messages", messageRoutes);
  app.use("/chats", chatsRoutes);
  app.use("/notes", noteRoutes);

  app.get("/", (req, res) => {
    res.send("<h1>Task manager API</h1>");
  });

  return app;
}
