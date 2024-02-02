import { Request, Response } from "express";
import { Task } from "@models/taskModel";
import * as mongoose from "mongoose";

export const createTask = async (req: Request, res: Response) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
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
};

export const updateTaskDetails = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Task with id: ${id}`);
    await Task.findByIdAndRemove(id);
    res.json({ message: "Task deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

export const fetchUserTasks = async (req: Request, res: Response) => {
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
};

export const getAllTasksInWorkspace = async (req: Request, res: Response) => {
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
};
