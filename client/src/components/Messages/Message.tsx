import React from "react";
import pic from "../../assets/somepic.png";

export interface MessageProp {
  own: boolean;
}

export default function Message(props: MessageProp) {
  return (
    <div
      className={`flex flex-col ${
        props.own ? "justify-self-end" : "justify-self-start"
      } w-[70%] mb-3`}
    >
      <div className={`flex ${props.own && 'flex-row-reverse'} gap-2`}>
        <img
          className="h-9 w-9 rounded-[50%]"
          src={pic}
          alt="text avatar user"
        />
        <p className={`${props.own ? 'bg-gray-200 text-black' : 'text-white bg-blue-900'} whitespace-normal text-md break-words max-w-[70% rounded-md p-2`}>
        So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist. 
        </p>
      </div>
      <p className={`text-sm ml-11 ${props.own && 'text-right mr-11'}`}>Just now</p>
    </div>
  );
}
