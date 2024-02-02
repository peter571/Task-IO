import { Request, Response } from "express";
import { Note } from "@models/noteModel";
import mongoose from "mongoose";

export const createNote = async (req: Request, res: Response) => {
  try {
    const newTask = await (await Note.create(req.body)).save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getUserNotes = async (req: Request, res: Response) => {
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
};

export const updateNote = async (req: Request, res: Response) => {
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
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json();

    await Note.findByIdAndRemove(id);
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
