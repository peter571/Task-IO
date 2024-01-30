import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import {
  createTask,
  updateTaskStatus,
  updateTaskDetails,
  deleteTask,
  fetchUserTasks,
  getAllTasksInWorkspace,
} from "../controllers/taskController";

const router = express.Router();

router.post("/new-task", verifyJWT, createTask);
router.patch("/update-task-status/:taskId", verifyJWT, updateTaskStatus);
router.patch("/update-task/:task_id", verifyJWT, updateTaskDetails);
router.delete("/delete-task/:id", verifyJWT, deleteTask);
router.get("/user/:workspace_id/:userId", verifyJWT, fetchUserTasks);
router.get("/:workspace_id", verifyJWT, getAllTasksInWorkspace);

export default router;
