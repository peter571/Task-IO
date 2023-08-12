import express from "express";
import authenticateToken from "../middleware/auth";
import {
  createTask,
  updateTaskStatus,
  updateTaskDetails,
  deleteTask,
  fetchUserTasks,
  getAllTasksInWorkspace,
} from "../controllers/taskController";

const router = express.Router();

router.post("/new-task", authenticateToken, createTask);
router.patch("/update-task-status/:taskId", authenticateToken, updateTaskStatus);
router.patch("/update-task/:task_id", authenticateToken, updateTaskDetails);
router.delete("/delete-task/:id", authenticateToken, deleteTask);
router.get("/user/:workspace_id/:userId", authenticateToken, fetchUserTasks);
router.get("/:workspace_id", authenticateToken, getAllTasksInWorkspace);

export default router;
