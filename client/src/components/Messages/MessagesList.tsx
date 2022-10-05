import React, { useCallback } from "react";
import { messageSelector } from "../../features/message/messageSlice";
import { useAppSelector } from "../../hooks/hook";
import Loader from "../Loader/Loader";
import Message from "./Message";

interface MessagesListProp {
  messages: Array<any>;
}

export function MessagesList({ messages }: MessagesListProp) {
  const { isloadingMessages } = useAppSelector(messageSelector);
  const msgRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  if (isloadingMessages) {
    <div className="grid h-[80%]">
      <Loader />
    </div>;
  }

  return (
    <div
      id="messages-container"
      className="grid h-[80%] overflow-auto rounded-sm"
    >
      {messages.length === 0 ? (
        <p className="text-center">No messages for this chat</p>
      ) : (
        messages.map((msg, index) => {
          const lastMsg = messages.length - 1 === index;
          return (
            <div
              key={index}
              ref={lastMsg ? msgRef : null}
              className={`flex flex-col ${
                msg.fromSelf ? "justify-self-end" : "justify-self-start"
              } w-[70%] mb-5`}
            >
              <Message {...msg} />
            </div>
          );
        })
      )}
    </div>
  );
}
