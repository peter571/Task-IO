import { UserAvatar } from "./UserAvatar";
import { MessagesList } from "./MessagesList";
import { TextInput } from "./TextInput";
import React, { useEffect } from "react";
import {
  messageSelector,
  getConversations,
} from "../../features/message/messageSlice";
import { spacesSelector } from "../../features/spaces/spaceSlice";
import { userSelector } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";

export default function Messages() {
  const { spaceMembers } = useAppSelector(spacesSelector);
  const { selectedUserId, user } = useAppSelector(userSelector);
  const { messages } = useAppSelector(messageSelector);
  const dispatch = useAppDispatch();
  const selectedUser = spaceMembers.find(
    (user) => user.userId === selectedUserId
  );

  useEffect(() => {
    const fetchTexts = async () => {
      if (user && selectedUserId) {
        await dispatch(getConversations({ from: user.userId, to: selectedUserId })).unwrap();
      }
    };
    fetchTexts();
  }, [selectedUserId]);

  if (!selectedUserId)
    return (
      <div className="basis-1/2 px-3 h-screen relative">
        <p>Open Conversation</p>
      </div>
    );

  return (
    <div className="basis-1/2 h-full flex flex-col">
      <UserAvatar selectedUser={selectedUser} />
      <MessagesList messages={messages} />
      <TextInput />
    </div>
  );
}
