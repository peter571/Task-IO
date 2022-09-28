import React from "react";
import pic from "../../assets/somepic.png";
import { MessageProp } from "../../types";

export default function Message(props: MessageProp) {
  return (
    <div
      className={`flex flex-col ${
        props.fromSelf ? "justify-self-end" : "justify-self-start"
      } w-[70%] mb-3`}
    >
      <div className={`flex ${props.fromSelf && "flex-row-reverse"} gap-2`}>
        <img
          className="h-9 w-9 rounded-[50%]"
          src={pic}
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
        Just now
      </p>
    </div>
  );
}
