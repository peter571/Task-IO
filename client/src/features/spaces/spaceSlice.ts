import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { spacesAPI } from "../../api";
import { RootState } from "../../app/store";
import { AddMemberToSpaceProp, SpaceProp, User, ValidationErrors } from "../../types";

interface SpaceState {
  userSpaces: Array<any>;
  spaceMembers: Array<any>;
}

export const getUserSpacesByUserId = createAsyncThunk(
  "spaces/getUserSpacesByUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await spacesAPI.getSpacesByUserId(userId);
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

export const getSpaceMembersBySpaceId = createAsyncThunk(
  "spaces/getSpaceMembersBySpaceId",
  async (spaceId: string, { rejectWithValue }) => {
    try {
      const { data } = await spacesAPI.getSpaceMembersBySpaceId(spaceId);
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

export const createNewSpace = createAsyncThunk(
  "spaces/createNewSpace",
  async (spaceDetails: SpaceProp) => {
    const { data } = await spacesAPI.addNewSpace(spaceDetails);
    return data;
  }
);

export const addMemberToSpace = createAsyncThunk(
  "spaces/addMemberToSpace",
  async ({ spaceId, user }: AddMemberToSpaceProp) => {
    const { data } = await spacesAPI.addMemberToSpace(spaceId, user);
    return data;
  }
);

const spaceSlice = createSlice({
  name: "spaces",
  initialState: {
    userSpaces: [],
    spaceMembers: []
  } as SpaceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserSpacesByUserId.fulfilled, (state, { payload }) => {
      state.userSpaces = payload;
    });
    builder.addCase(
      getSpaceMembersBySpaceId.fulfilled,
      (state, { payload }) => {
        state.spaceMembers = payload;
      }
    );
  },
});

export const spacesSelector = (state: RootState) => state.spaces;
export default spaceSlice.reducer;
