import express from "express";
import authenticateToken from "../middleware/auth";
import { Note } from "../models/noteModel";
import mongoose from "mongoose";

const router = express.Router();

//Create new note
router.post("/new-note", authenticateToken, async (req, res) => {
  try {
    const newTask = await (await Note.create(req.body)).save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//get user notes
router.get(
  "/user-notes/:workspace_id/:userId",
  authenticateToken,
  async (req, res) => {
    const { workspace_id, userId } = req.params;

    try {
      const notes = await Note.find(
        { workspace_id: workspace_id, user: userId },
        { __v: 0 }
      );
      res.status(200).json(notes);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

//Update notes
router.patch("/update-note/:id", authenticateToken, async (req, res) => {
  const { title, text } = req.body;
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json();

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title: title, text: text },
      { new: true }
    );
    res.status(201).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Delete note
router.delete("/delete-note/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json();

    await Note.findByIdAndRemove(id);
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
