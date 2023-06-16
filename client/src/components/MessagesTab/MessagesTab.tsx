import { UserAvatar } from "./UserAvatar";
import { MessagesList } from "./MessagesList";
import { TextInput } from "./TextInput";
import React, { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import { useGetWorkSpaceMembersQuery } from "../../features/api/workspaceApi";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";
import { useGetMessagesQuery } from "../../features/api/messageApi";

export default function MessagesTab() {
  const { spaceId } = useParams();
  
  const { data: spaceMembers = [] } = useGetWorkSpaceMembersQuery(spaceId);
  const { user } = useAccountContext();
  const { selectedChat } = useWorkSpaceContext();
  const { data: chatMessages = [] } = useGetMessagesQuery(selectedChat)

  console.log("Messages", chatMessages)

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
      <UserAvatar selectedUser={null} />
      <MessagesList messages={chatMessages} />
      <TextInput />
    </div>
  );
}
