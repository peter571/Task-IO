import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { usersAPI } from "../../api";
import { RootState } from "../../app/store";
import { LoginValues, RegisterValues, User, ValidationErrors } from "../../types";

export interface UserState {
  user: User | null;
  isloading: boolean;
  hasError: boolean;
  errorMessage: string | undefined;
  selectedUserId: string | null;
}

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginDetails: LoginValues, { rejectWithValue }) => {
    try {
      const { data } = await usersAPI.loginUser(loginDetails);
      return data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (registerDetails: RegisterValues, { rejectWithValue }) => {
    try {
      const { data } = await usersAPI.registerUser(registerDetails);
      return data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> =
        err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("account_user")!)?.user,
    isloading: false,
    hasError: false,
    errorMessage: '',
    selectedUserId: null
  } as UserState,
  reducers: {
    selectUserById: (state, action) => {
      state.selectedUserId = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
        state.isloading = true;
        state.hasError = false;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isloading = false;
        state.hasError = false;
    });
    builder.addCase(loginUser.rejected, (state, { payload, error }) => {
        state.errorMessage = error.message;
        state.isloading = false;
        state.hasError = true;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.isloading = true;
      state.hasError = false;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.isloading = false;
      state.hasError = false;
    });
    builder.addCase(registerUser.rejected, (state, { payload, error }) => {
      state.errorMessage = error.message;
      state.isloading = false;
      state.hasError = true;
    });
  },
});

export const userSelector = (state: RootState) => state.users;

export const { selectUserById } = userSlice.actions;
export default userSlice.reducer;