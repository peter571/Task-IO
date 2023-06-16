import React, { useContext, useState } from "react";
import MembersAndChatSidebar from "../MembersAndChatSidebar/MembersAndChatSidebar";
import MessagesTab from "../MessagesTab/MessagesTab";
import Tasks from "../Tasks/Tasks";

const WorkSpaceContext = React.createContext(
  {} as {
    selectedChat: string;
    setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
    selectedUser: string | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<string | null>>;
  }
);

export const useWorkSpaceContext = () => {
  return useContext(WorkSpaceContext);
};

export default function WorkSpace() {
  const [selectedChat, setSelectedChat] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <WorkSpaceContext.Provider
      value={{ selectedChat, setSelectedChat, selectedUser, setSelectedUser }}
    >
      <div className="flex flex-row gap-1 divide-x h-screen">
        <MembersAndChatSidebar />
        <MessagesTab />
        <Tasks />
      </div>
    </WorkSpaceContext.Provider>
  );
}
