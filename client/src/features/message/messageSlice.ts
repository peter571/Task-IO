import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { messagesAPI } from "../../api";
import { RootState } from "../../app/store";
import { ConversationMembers, MessageDetails, MessageProp } from "../../types";

interface MessageState {
  messages: MessageProp[];
  isloadingMessages: boolean;
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
  initialState: { messages: [], isloadingMessages: false } as MessageState,
  reducers: {
    updateConversations: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversations.rejected, (state, { payload }) => {
      state.isloadingMessages = false;
    });
    builder.addCase(getConversations.fulfilled, (state, { payload }) => {
      state.messages = payload;
      state.isloadingMessages = false;
    });
    builder.addCase(getConversations.pending, (state, { payload }) => {
      state.isloadingMessages = true;
    });
  },
});

export const { updateConversations } = messageSlice.actions;
export const messageSelector = (state: RootState) => state.messages;
export default messageSlice.reducer;
