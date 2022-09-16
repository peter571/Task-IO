import express from "express";
import authenticateToken from "../middleware/auth";
import { Task } from "../models/taskModel";
import * as mongoose from "mongoose";

const router = express.Router();

//Create new Task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newTask = new Task({ ...req.body });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: "Failed to save task" });
  }
});

// Update Task
router.patch('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Task with id: ${id}`);
  delete task.id;
  const updatedTask = { ...task, _id: id };
  await Task.findByIdAndUpdate(id, updatedTask, { new: true });
  res.json(updatedTask);
});

// Delete Task
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Task with id: ${id}`);
    await Task.findByIdAndRemove(id);
    res.json({ message: "Task deleted Successfully" });
  } catch (error) {
    res.status(409).json({ message: "Failed to delete task" });
  }
});

// Fetch tasks
router.get('/', authenticateToken, async (req, res) => {});

export default router;