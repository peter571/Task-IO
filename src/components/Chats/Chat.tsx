import React from "react";
import { ChatProp } from "../../types";

export default function Chat(props: ChatProp) {
  return (
    <div className="flex flex-row align-middle gap-2 cursor-pointer">
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
    </div>
  );
}
