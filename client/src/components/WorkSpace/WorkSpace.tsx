import React, { useContext, useEffect, useState } from "react";
import MembersAndChatSidebar from "components/MembersAndChatSidebar/MembersAndChatSidebar";
import MessagesTab from "components/MessagesTab/MessagesTab";
import TasksTab from "components/TasksTab/TasksTab";
import { useAccountContext } from "context/AccountContext";
import { useGetWorkSpaceQuery } from "features/api/workspaceApi";
import { useParams } from "react-router-dom";
import socket from "socket/socket";
import { useLazyGetMessagesQuery } from "features/api/messageApi";
import { useSocket } from "context/SocketContext";

interface WorkSpaceContextProp {
  selectedChat: string;
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
  selectedUser: string | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<string | null>>;
  userIsAdmin: boolean;
  setSelectedTask: React.Dispatch<React.SetStateAction<string | null>>;
  selectedTaskId: string | null;
  selectedNoteId: string | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<string | null>>;
  spaceId: string | null;
  selectedChatMessages: any[];
  loadingMessages: boolean;
  setSelectedChatMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

const WorkSpaceContext = React.createContext(
  {} as WorkSpaceContextProp
);

export const useWorkSpaceContext = () => {
  return useContext(WorkSpaceContext);
};

export default function WorkSpace() {
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [selectedTaskId, setSelectedTask] = useState<string | null>(null);
  const [selectedNoteId, setSelectedNote] = useState<string | null>(null);
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("inbox");
  const [selectedChat, setSelectedChat] = useState(
    JSON.parse(sessionStorage.getItem(userName!)!)?.chat_id
  );
  const [selectedUser, setSelectedUser] = useState<string | null>(
    JSON.parse(sessionStorage.getItem(userName!)!)?.user_id
  );
  const { space } = useParams();
  const [spaceId] = useState<string | null>(
    JSON.parse(sessionStorage.getItem(space!)!)
  );

  const { user } = useAccountContext();
  const { data: workspace, isSuccess: spaceLoaded } =
    useGetWorkSpaceQuery(spaceId);
  const [
    fetchChatMessages,
    { isLoading: loadingMessages, data: messages = [] },
  ] = useLazyGetMessagesQuery();
  const [selectedChatMessages, setSelectedChatMessages] =
    useState<any[]>(messages);
  const { setOnlineUsers } = useSocket();

  useEffect(() => {
    if (selectedChat) {
      setSelectedChatMessages(messages);
    }
  }, [messages]);

  /**Fetch chats of the selected ChatID */
  useEffect(() => {
    (async function () {
      if (selectedChat) {
        try {
          const payload = await fetchChatMessages(selectedChat, false).unwrap();
          //setSelectedChatMessages(payload);
        } catch (error) {}
      }
    })();
  }, [selectedChat]);

  useEffect(() => {
    if (spaceLoaded && workspace)
      setUserIsAdmin(user.userId.toString() === workspace.admin.toString());
  }, [spaceLoaded]);

  // /**Listen to incoming message and update the messages array */
  useEffect(() => {
    socket.on("private message", (data) => {
      /** Update the message list of user if currently on the chat ID */
      if (selectedChat && selectedChat.toString() === data.chat_id.toString()) {
        setSelectedChatMessages((prevMessages) => [...prevMessages, data]);
      } else {
        /**If user is not selected chat(Show the chat ID has a new message) */
        setOnlineUsers((prevUsers) => {
          if (prevUsers.length === 0) return prevUsers;
          return prevUsers.map((userObj) => {
            if (userObj?.userID === data?.sender._id) {
              return { ...userObj, hasNewMessage: true };
            } else {
              return userObj;
            }
          });
        });
      }
    });

    return () => {
      socket.off("private message");
    };
  }, []);


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
        spaceId,
        selectedChatMessages,
        loadingMessages,
        setSelectedChatMessages,
      }}
    >
      <div className="flex flex-row gap-1 divide-x h-screen bg-white">
        <MembersAndChatSidebar />
        <MessagesTab />
        <TasksTab />
      </div>
    </WorkSpaceContext.Provider>
  );
}
