import express from "express";
import verifyJWT from "@middlewares/verifyJWT";
import { createNewChat, getUserChats } from "@controllers/chatsController";

const router = express.Router();

// Create a new chat
router.post("/new-chat", verifyJWT, createNewChat);

// Get user chats
router.get("/:workspaceId/:userId", verifyJWT, getUserChats);

export default router;
