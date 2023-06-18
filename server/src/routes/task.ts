import express from "express";
import authenticateToken from "../middleware/auth";
import { Task } from "../models/taskModel";
import * as mongoose from "mongoose";

const router = express.Router();

//Create new Task
router.post("/new-task", authenticateToken, async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Task status
router.patch(
  "/update-task-status/:taskId",
  authenticateToken,
  async (req, res) => {
    const { taskId } = req.params;
    const task = req.body;
    if (!mongoose.Types.ObjectId.isValid(taskId))
      return res.status(404).send(`No Task with id: ${taskId}`);

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: task.status },
      { new: true }
    );
    res.status(201).json(updatedTask);
  }
);

//Update task details
router.patch("/update-task/:task_id", authenticateToken, async (req, res) => {
  const { task_id } = req.params;
  const { title, description, completion_date } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(task_id))
      return res.status(404).send(`No Task with id: ${task_id}`);

    const updatedTask = await Task.findByIdAndUpdate(
      task_id,
      {
        title: title,
        description: description,
        completion_date: completion_date,
      },
      { new: true }
    );
    res.status(201).json(updatedTask);
  } catch (error) {}
});

// Delete Task
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
console.log("ID",id)
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
router.get(
  "/user/:workspace_id/:userId",
  authenticateToken,
  async (req, res) => {
    const { workspace_id, userId } = req.params;

    try {
      const tasks = await Task.find(
        { assignee: userId, workspace_id: workspace_id },
        { __v: 0 }
      );
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  }
);

//Get all the tasks in the workspace
//Only admin of the workspace can call this endpoint
router.get("/:workspace_id", authenticateToken, async (req, res) => {
  const { workspace_id } = req.params;
  const { status_type } = req.query;

  try {
    if (status_type === "all-tasks") {
      const all_tasks = await Task.find(
        { workspace_id: workspace_id },
        { __v: 0 }
      ).populate("assignee", { password: 0, __v: 0 });
      return res.status(200).json(all_tasks);
    }

    const tasks = await Task.find(
      { workspace_id: workspace_id, status: status_type },
      { __v: 0 }
    ).populate("assignee", { password: 0, __v: 0 });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
