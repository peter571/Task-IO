import express from "express";
import authenticateToken from "../middleware/auth";
import { Task } from "../models/taskModel";
import * as mongoose from "mongoose";

const router = express.Router();

//Create new Task
router.post("/", authenticateToken, async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

// Update Task
router.patch("/:taskId", authenticateToken, async (req, res) => {
  const { taskId } = req.params;
  const task = req.body;
  if (!mongoose.Types.ObjectId.isValid(taskId))
    return res.status(404).send(`No Task with id: ${taskId}`);

  const updatedTask = await Task.findByIdAndUpdate(taskId, { status: task.status }, { new: true });
  res.status(201).json(updatedTask);
});

// Delete Task
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Task with id: ${id}`);
    await Task.findByIdAndRemove(id);
    res.json({ message: "Task deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

// Fetch User tasks
router.get("/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ assignee: userId }, { __v: 0 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

export default router;
