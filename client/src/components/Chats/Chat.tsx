import React from "react";
import { ChatProp } from "../../types";

export default function Chat(props: ChatProp) {
  return (
    <div className="relative flex flex-row align-middle gap-2 border cursor-pointer p-2 rounded-md hover:bg-gray-200">
      <img
        className="h-12 w-12 rounded-[50%]"
        src={props.profileImage}
        alt={props.userName}
        loading="lazy"
      />
      <div>
        <h1 className="font-semibold">{props.userName}</h1>
        <p className="font-light text-sm">{props.previewText}</p>
      </div>
      <div className="bg-green-500 absolute h-3 w-3 left-3 rounded-[50%]"></div>
    </div>
  );
}
