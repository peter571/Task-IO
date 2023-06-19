import React, { useEffect, useState } from "react";
import { MemberProp } from "../../types";
import { useAccountContext } from "../../context/AccountContext";
import { Avatar } from "flowbite-react";
import { useNewChatMutation } from "../../features/api/chatApi";
import { useNavigate } from "react-router-dom";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";
import { formatUrlString } from "../../utils/formatUrlString";

export default function Member(props: MemberProp) {
  const { _id } = props;
  const { user } = useAccountContext();
  const { setSelectedChat, setSelectedUser, spaceId } = useWorkSpaceContext();
  const [newChat, { isLoading }] = useNewChatMutation();
  const navigate = useNavigate();

  const handleParam = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("inbox", props.name.toLowerCase());
    navigate(url.pathname + url.search);
  };

  async function createNewChat() {
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

  return (
    <div
      className="bg-gray-200 flex flex-row items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 m-2"
      onClick={createNewChat}
      role="button"
    >
      <Avatar status="online" statusPosition="bottom-right" size="sm" />
      <div>
        <h1 className="font-semibold text-sm">
          {props.name}
          {_id === user.userId && "(you)"}
        </h1>
        {props.showLastMsg && <p className="text-xs">Last message</p>}
      </div>
    </div>
  );
}
