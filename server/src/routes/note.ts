import express from "express";
import authenticateToken from "../middleware/auth";
import {
  createNote,
  getUserNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController";

const router = express.Router();

// Create new note
router.post("/new-note", authenticateToken, createNote);

// Get user notes
router.get(
  "/user-notes/:workspace_id/:userId",
  authenticateToken,
  getUserNotes
);

// Update notes
router.patch("/update-note/:id", authenticateToken, updateNote);

// Delete note
router.delete("/delete-note/:id", authenticateToken, deleteNote);

export default router;
