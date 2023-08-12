import express from "express";
import authenticateToken from "../middleware/auth";
import { createNewChat, getUserChats } from "../controllers/chatsController";

const router = express.Router();

// Create a new chat
router.post("/new-chat", authenticateToken, createNewChat);

// Get user chats
router.get("/:workspaceId/:userId", authenticateToken, getUserChats);

export default router;
