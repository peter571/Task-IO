import React from "react";
import noprofile from "../../assets/noprofile.png";
import { MessageProp } from "../../types";
import { format } from "timeago.js";
import { Avatar } from "flowbite-react";
import { useAccountContext } from "../../context/AccountContext";

export default function Message(props: MessageProp) {
  const { user } = useAccountContext();
  const fromSelf = props.sender === user.userId;
  return (
    <div
     
    >
      <div className={`flex ${fromSelf && "flex-row-reverse"} gap-2`}>
        <Avatar size="sm" rounded />
        <p
          className={`${
            fromSelf ? "bg-gray-200 text-black" : "text-white bg-blue-900"
          } whitespace-normal text-md break-words max-w-[70% rounded-md p-2`}
        >
          {props.content}
        </p>
      </div>
      <p className={`text-sm ml-11 ${fromSelf && "text-right mr-11"}`}>
        {format(props.createdAt)}
      </p>
    </div>
  );
}
