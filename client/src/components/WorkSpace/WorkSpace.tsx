import React, { useContext, useEffect, useState } from "react";
import MembersAndChatSidebar from "../MembersAndChatSidebar/MembersAndChatSidebar";
import MessagesTab from "../MessagesTab/MessagesTab";
import TasksTab from "../TasksTab/TasksTab";
import { useAccountContext } from "../../context/AccountContext";
import { useGetWorkSpaceQuery } from "../../features/api/workspaceApi";
import { useParams } from "react-router-dom";

const WorkSpaceContext = React.createContext(
  {} as {
    selectedChat: string;
    setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
    selectedUser: string | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<string | null>>;
    userIsAdmin: boolean;
    setSelectedTask: React.Dispatch<React.SetStateAction<string | null>>;
    selectedTaskId: string | null;
    selectedNoteId: string | null;
    setSelectedNote: React.Dispatch<React.SetStateAction<string | null>>;
  }
);

export const useWorkSpaceContext = () => {
  return useContext(WorkSpaceContext);
};

export default function WorkSpace() {
  const [selectedChat, setSelectedChat] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [selectedTaskId, setSelectedTask] = useState<string | null>(null);
  const [selectedNoteId, setSelectedNote] = useState<string | null>(null);
  const { spaceId } = useParams();
  const { user } = useAccountContext();
  const { data: workspace, isSuccess: spaceLoaded } =
    useGetWorkSpaceQuery(spaceId);

  useEffect(() => {
    if (spaceLoaded && workspace)
      setUserIsAdmin(user.userId.toString() === workspace.admin.toString());
  }, [spaceLoaded]);


  return (
    <WorkSpaceContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        selectedUser,
        setSelectedUser,
        userIsAdmin,
        selectedTaskId,
        setSelectedTask,
        selectedNoteId,
        setSelectedNote,
      }}
    >
      <div className="flex flex-row gap-1 divide-x h-screen">
        <MembersAndChatSidebar />
        <MessagesTab />
        <TasksTab />
      </div>
    </WorkSpaceContext.Provider>
  );
}
