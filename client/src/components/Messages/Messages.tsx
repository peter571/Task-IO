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
import { TiMessages } from "react-icons/ti";

export default function Messages() {
  const { spaceMembers } = useAppSelector(spacesSelector);
  const { selectedUserId, user } = useAppSelector(userSelector);
  const { messages } = useAppSelector(messageSelector);
  const dispatch = useAppDispatch();
  const selectedUser = spaceMembers.find(
    (user) => user.userId === selectedUserId
  );

  useEffect(() => {
    if (user && selectedUserId) {
      dispatch(getConversations({ from: user.userId, to: selectedUserId }));
    }
  }, [selectedUserId]);

  if (!selectedUserId)
    return (
      <div className="w-3/5 px-3 h-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <TiMessages color="gray" size={65} className="" />
          <p className="font-semibold text-gray-500">Select Conversation</p>
        </div>
      </div>
    );

  return (
    <div className="w-3/5 h-full flex flex-col">
      <UserAvatar selectedUser={selectedUser} />
      <MessagesList messages={messages} />
      <TextInput />
    </div>
  );
}
