import React, { useEffect, useState } from "react";
import { MemberProp } from "../../types";
import { useAccountContext } from "../../context/AccountContext";
import { Avatar } from "flowbite-react";
import { useNewChatMutation } from "../../features/api/chatApi";
import { useParams } from "react-router-dom";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";

export default function Member(props: MemberProp) {
  const { _id } = props;
  const { user } = useAccountContext();
  const { setSelectedChat, setSelectedUser } = useWorkSpaceContext();
  const { spaceId } = useParams();

  const [newChat, { isLoading }] = useNewChatMutation();

  async function createNewChat() {
    try {
      const payload = await newChat({
        workspace_id: spaceId,
        userone: _id,
        usertwo: user.userId,
      }).unwrap();
      
      setSelectedChat(payload._id);
      setSelectedUser(_id)
    } catch (error) {}
  }

  return (
    <div
      className="bg-gray-200 flex flex-row items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 m-2"
      onClick={createNewChat}
      role="button"
    >
      <Avatar
        status="online"
        statusPosition="bottom-right"
        className=""
        size="sm"
      />
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
