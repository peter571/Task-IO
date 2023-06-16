import React from "react";
import { TiMessage } from "react-icons/ti";

export default function NoConversation() {
  return (
    <div className="flex flex-col justify-center items-center">
      <TiMessage color="gray" size={25} />
      <p className="text-sm font-semibold text-gray-500">No Conversation</p>
    </div>
  );
}
