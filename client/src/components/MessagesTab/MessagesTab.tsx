import React from "react";
import { UserAvatar } from "components/MessagesTab/UserAvatar";
import { MessagesList } from "components/MessagesTab/MessagesList";
import { TextInput } from "components/MessagesTab/TextInput";
import { TiMessages } from "react-icons/ti";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";

export default function MessagesTab() {
  const { selectedChat } = useWorkSpaceContext();

  if (!selectedChat)
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
      <UserAvatar />
      {selectedChat && <MessagesList />}
      <TextInput />
    </div>
  );
}
