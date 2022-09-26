import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tasksAPI } from "../../api";
import { TaskProp, UpdateTaskById } from "../../types";

interface TaskState {
    selectedUserTasks: []
}

export const saveNewTask = createAsyncThunk(
  "tasks/saveNewTask",
  async (newTask: TaskProp) => {
    const { data } = await tasksAPI.addNewTask(newTask);
    return data;
  }
);

export const updateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({ taskId, task }: UpdateTaskById) => {
    const { data } = await tasksAPI.updateTaskById(taskId, task);
    return data;
  }
);

export const getTasksByUserId = createAsyncThunk(
  "tasks/getTasksByUserId",
  async (userId: string) => {
    const { data } = await tasksAPI.getTasksByUserId(userId);
    return data;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {selectedUserTasks: []} as TaskState,
  reducers: {},
  extraReducers: {},
});

export default taskSlice.reducer;
