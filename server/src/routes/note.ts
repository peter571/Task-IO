import express from "express";
import verifyJWT from "@middlewares/verifyJWT";
import {
  createNote,
  getUserNotes,
  updateNote,
  deleteNote,
} from "@controllers/noteController";

const router = express.Router();

// Create new note
router.post("/new-note", verifyJWT, createNote);

// Get user notes
router.get(
  "/user-notes/:workspace_id/:userId",
  verifyJWT,
  getUserNotes
);

// Update notes
router.patch("/update-note/:id", verifyJWT, updateNote);

// Delete note
router.delete("/delete-note/:id", verifyJWT, deleteNote);

export default router;
