import React from "react";
import noprofile from "../../assets/noprofile.png";
import { MessageProp } from "../../types";
import { format } from "timeago.js";

export default function Message(props: MessageProp) {
  return (
    <div>
      <div className={`flex ${props.fromSelf && "flex-row-reverse"} gap-2`}>
        <img
          className="h-9 w-9 rounded-[50%]"
          src={props.senderAvatar === 'string' ? props.senderAvatar : noprofile}
          alt="text avatar user"
        />
        <p
          className={`${
            props.fromSelf ? "bg-gray-200 text-black" : "text-white bg-blue-900"
          } whitespace-normal text-md break-words max-w-[70% rounded-md p-2`}
        >
          {props.message}
        </p>
      </div>
      <p className={`text-sm ml-11 ${props.fromSelf && "text-right mr-11"}`}>
        {format(props.createdAt)}
      </p>
    </div>
  );
}
