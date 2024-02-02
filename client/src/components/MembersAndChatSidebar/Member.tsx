import React from "react";
import { MemberProp } from "@/types";
import { useAccountContext } from "context/AccountContext";
import { Avatar, Badge } from "flowbite-react";
import { useNewChatMutation } from "features/api/chatApi";
import { useNavigate } from "react-router-dom";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";
import { formatUrlString } from "utils/formatUrlString";
import { useSocket } from "context/SocketContext";

export default function Member(props: MemberProp) {
  const { _id } = props;
  const { user } = useAccountContext();
  const { setSelectedChat, setSelectedUser, spaceId } = useWorkSpaceContext();
  const [newChat, { isLoading }] = useNewChatMutation();
  const navigate = useNavigate();
  const { onlineUsers, setOnlineUsers } = useSocket();

  const handleParam = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("inbox", formatUrlString(props.name.toLowerCase()));
    navigate(url.pathname + url.search);
  };

  async function createNewChat() {
    changeUserHasNoNewMessage();
    if (_id === user.userId) return;
    try {
      const payload = await newChat({
        workspace_id: spaceId,
        userone: _id,
        usertwo: user.userId,
      }).unwrap();

      setSelectedChat(payload._id);
      setSelectedUser(_id);
      sessionStorage.setItem(
        formatUrlString(props.name.toLowerCase()),
        JSON.stringify({ chat_id: payload._id, user_id: _id })
      );
      handleParam();
    } catch (error) {}
  }

  function checkMemberIsOnline() {
    if (onlineUsers.length === 0) return false;
    const found_user = onlineUsers.find((value) => value.userID === props._id);
    if (!found_user) return false;
    return found_user.connected;
  }

  function checkUserHasNewMessage() {
    if (onlineUsers.length === 0) return false;
    const found_user = onlineUsers.find((value) => value.userID === props._id);

    if (found_user && found_user.hasOwnProperty("hasNewMessage")) {
      return found_user.hasNewMessage;
    } else {
      return false;
    }
  }

  function changeUserHasNoNewMessage() {
    setOnlineUsers((prevUsers) => {
      return prevUsers.map((userObj) => {
        if (userObj.userID.toString() === props._id) {
          return { ...userObj, hasNewMessage: false };
        } else {
          return userObj;
        }
      });
    });
  }

  return (
    <div
      className="bg-gray-200 flex flex-row items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 m-2 relative"
      onClick={createNewChat}
      role="button"
    >
      <Avatar
        status={checkMemberIsOnline() ? "online" : "offline"}
        statusPosition="bottom-right"
        size="xs"
      />
      <div>
        <h1 className="font-semibold text-sm">
          {props.name}
          {_id === user.userId && "(you)"}
        </h1>
        {/* {props.showLastMsg && <p className="text-xs">Last message</p>} */}
      </div>
      {checkUserHasNewMessage() && (
        <div className="absolute top-2 right-2 bg-[#E459CE] font-semibold rounded-md">
          <p className="text-xs p-1 text-white"></p>
        </div>
      )}
    </div>
  );
}
