import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { messagesAPI } from "../../api";
import { RootState } from "../../app/store";
import { ConversationMembers, MessageDetails, MessageProp } from "../../types";

interface MessageState {
  messages: MessageProp[];
}

export const addNewMessage = createAsyncThunk(
  "messages/addNewMessage",
  async (messageDetails: MessageDetails) => {
    const { data } = await messagesAPI.addNewMessage(messageDetails);
    return data;
  }
);

export const getConversations = createAsyncThunk(
  "messages/getConversations",
  async (users: ConversationMembers) => {
    const { data } = await messagesAPI.getUsersConversations(users);
    return data;
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: { messages: [] } as MessageState,
  reducers: {
    updateConversations: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getConversations.fulfilled, (state, { payload }) => {
      state.messages = payload;
    });
  },
});

export const { updateConversations } = messageSlice.actions;
export const messageSelector = (state: RootState) => state.messages;
export default messageSlice.reducer;
