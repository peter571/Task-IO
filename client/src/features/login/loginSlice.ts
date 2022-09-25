import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { usersAPI } from "../../api";
import { RootState } from "../../app/store";
import { LoginValues, User, ValidationErrors } from "../../types";

export interface LoginState {
  user: User;
  isloading: boolean;
  hasError: boolean;
  errorMessage: string | undefined;
}

export const loginUser = createAsyncThunk(
  "login/loginUser",
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

const loginSlice = createSlice({
  name: "login",
  initialState: {} as LoginState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
        state.isloading = true;
        state.hasError = false;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isloading = false;
        state.hasError = false;
    });
    builder.addCase(loginUser.rejected, (state, { payload, error }) => {
        state.errorMessage = error.message;
        state.isloading = false;
        state.hasError = true;
    });
  },
});

export const userLogin = (state: RootState) => state.login;

export default loginSlice.reducer;