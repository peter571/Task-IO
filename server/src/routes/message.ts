import express from "express";
import verifyJWT from "@middlewares/verifyJWT";
import {
  addNewMessage,
  getMessages,
  deleteMessage,
  editMessage,
  addTeamMessage,
  getTeamMessages,
} from "@controllers/messageController";

const router = express.Router();

router.post("/new-message", verifyJWT, addNewMessage);
router.get("/:chat_id", verifyJWT, getMessages);
router.delete(
  "/delete-message/:messageId",
  verifyJWT,
  deleteMessage
);
router.patch(
  "/edit-message/:messageId",
  verifyJWT,
  editMessage
);

router.post("/team-message", verifyJWT, addTeamMessage);
router.get(
  "/get-team-messages/:teamId",
  verifyJWT,
  getTeamMessages
);

export default router;
