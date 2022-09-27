import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tasksAPI } from "../../api";
import { RootState } from "../../app/store";
import { TaskProp, TaskPropRender, UpdateTaskById } from "../../types";

interface TaskState {
  selectedUserTasks: Array<any>;
  isloadingUserTasks: boolean;
  selectedTask: TaskPropRender | null;
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
  initialState: {
    selectedUserTasks: [],
    isloadingUserTasks: false,
    selectedTask: null,
  } as TaskState,
  reducers: {
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasksByUserId.pending, (state, action) => {
      state.isloadingUserTasks = true;
    });
    builder.addCase(getTasksByUserId.fulfilled, (state, { payload }) => {
      state.selectedUserTasks = payload;
      state.isloadingUserTasks = false;
    });
    builder.addCase(getTasksByUserId.rejected, (state, action) => {
      state.isloadingUserTasks = false;
    });
    builder.addCase(updateTaskById.fulfilled, (state, { payload }) => {
      state.selectedTask = payload;
      state.selectedUserTasks = state.selectedUserTasks.map((task) => {
        if (task.id === state.selectedTask?._id) {
          task.status = payload.status;
        }
        return task;
      });
    });
  },
});

export const { selectTask } = taskSlice.actions;
export const taskSelector = (state: RootState) => state.tasks;
export default taskSlice.reducer;
