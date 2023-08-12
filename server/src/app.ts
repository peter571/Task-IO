import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import messageRoutes from "./routes/message";
import spaceRoutes from "./routes/space";
import chatsRoutes from "./routes/chat";
import noteRoutes from "./routes/note";
import { connectDB } from "./database/database";


dotenv.config();
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(cors({ origin: "*" }));

/**Routes */
app.use("/users", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/spaces", spaceRoutes);
app.use("/messages", messageRoutes);
app.use("/chats", chatsRoutes);
app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Task manager API</h1>");
});


(async () => {
  /**DATABASE CONNECTION*/
  const CONNECTION_URL = `${process.env.MONGO_URL}`;
  await connectDB(CONNECTION_URL);

  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`Task IO server listening at http://localhost:${PORT}`);
  });
})();
