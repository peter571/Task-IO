import React, { useCallback } from "react";
import Loader from "components/Loader/Loader";
import Message from "components/MessagesTab/Message";
import { TbMessages } from "react-icons/tb";
import { useAccountContext } from "context/AccountContext";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";


export function MessagesList() {
  const { user } = useAccountContext();
  const { loadingMessages, selectedChatMessages } = useWorkSpaceContext();

  const msgRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  if (loadingMessages) {
    return (
      <div className="flex justify-center items-center h-[80%]">
        <Loader />
      </div>
    );
  }

  return (
    <div
      id="messages-container"
      className="grid content-start h-[80%] overflow-auto px-3 rounded-sm w-full"
    >
      {/* Display when there is no messages */}
      {selectedChatMessages.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <TbMessages color="gray" size={25} />
          <p className="text-center text-gray-500">No messages for this chat</p>
        </div>
      ) : (
        selectedChatMessages.map((msg: any, index: number) => {
          const lastMsg = selectedChatMessages.length - 1 === index;
          return (
            <div
              key={index}
              ref={lastMsg ? msgRef : null}
              className={`justify-self-start w-full mb-5`}
            >
              <Message {...msg} />
            </div>
          );
        })
      )}
    </div>
  );
}
