import express from "express";
import authenticateToken from "../middleware/auth";
import {
  addNewMessage,
  getMessages,
  deleteMessage,
  editMessage,
  addTeamMessage,
  getTeamMessages,
} from "../controllers/messageController";

const router = express.Router();

router.post("/new-message", authenticateToken, addNewMessage);
router.get("/:chat_id", authenticateToken, getMessages);
router.delete(
  "/delete-message/:messageId",
  authenticateToken,
  deleteMessage
);
router.patch(
  "/edit-message/:messageId",
  authenticateToken,
  editMessage
);

router.post("/team-message", authenticateToken, addTeamMessage);
router.get(
  "/get-team-messages/:teamId",
  authenticateToken,
  getTeamMessages
);

export default router;
