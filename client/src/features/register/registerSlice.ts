import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../../api";
import { LoginState } from "../login/loginSlice";
import { RegisterValues, ValidationErrors } from '../../types'
import { RootState } from "../../app/store";
import { AxiosError } from "axios";

interface RegisterState extends LoginState {}

export const registerUser = createAsyncThunk(
  "register/registerUser",
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

const registerSlice = createSlice({
  name: "register",
  initialState: {} as RegisterState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
        state.isloading = true;
        state.hasError = false;
    })
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isloading = false;
        state.hasError = false;
    })
    builder.addCase(registerUser.rejected, (state, { payload, error }) => {
        state.errorMessage = error.message;
        state.isloading = false;
        state.hasError = true;
    })
  },
});

export const userRegisterSelector = (state: RootState) => state.register;
export default registerSlice.reducer;
