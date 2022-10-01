import React, { useCallback, useEffect, useState } from "react";
import { SocketProvider, useSocket } from "../../context/SocketContext";
import {
  messageSelector,
  addNewMessage,
  getConversations,
  updateConversations,
} from "../../features/message/messageSlice";
import { spacesSelector } from "../../features/spaces/spaceSlice";
import { userSelector } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import Message from "./Message";

export default function Messages() {
  const { spaceMembers } = useAppSelector(spacesSelector);
  const { selectedUserId, user } = useAppSelector(userSelector);
  const { messages } = useAppSelector(messageSelector);
  const [textMsg, setTextMsg] = useState("");
  const dispatch = useAppDispatch();
  const { socket } = useSocket();
  const msgRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const selectedUser = spaceMembers.find(
    (user) => user.userId === selectedUserId
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (user && selectedUserId) {
        const msgDetails = {
          text: textMsg,
          users: [user.userId, selectedUserId],
          sender: user.userId,
          senderAvatar: user.avatar,
        };
        
        if (socket) {
          console.log('Reacehed socket!')
        }
        socket?.emit("send-message", {
          recipients: msgDetails.users,
          createdAt: Date.now(),
          message: msgDetails.text,
          senderAvatar: msgDetails.senderAvatar,
        });
        //const newMsg = await dispatch(addNewMessage(msgDetails)).unwrap();
        setTextMsg("");
        //dispatch(getConversations({ from: user.userId, to: selectedUserId }));
      }
    } catch (error) {}
  }

  function handleChange(e: React.ChangeEvent<any>) {
    setTextMsg(e.target.value);
  }

  useEffect(() => {
    if (user && selectedUserId) {
      dispatch(getConversations({ from: user.userId, to: selectedUserId }));
    }
  }, [user, selectedUserId]);

  useEffect(() => {
    if (socket == null) return;

    socket.on(
      "receive-message",
      ({ recipients, sender, message, createdAt, senderAvatar }) => {
        const msg = {
          fromSelf: user?.userId === sender,
          senderAvatar,
          message,
          createdAt
        };
        console.log(msg)
        dispatch(updateConversations(msg));
      }
    );
    return () => {
      socket.off("receive-message");
    };
  }, [socket, handleSubmit]);

  console.log(socket)

  if (!selectedUserId || !user)
    return (
      <div className="basis-1/2 px-3 h-screen relative">
        <p>Open Conversation</p>
      </div>
    );

  return (
    <SocketProvider id={user.userId}>
      <div className="basis-1/2 px-3 h-screen relative">
        {selectedUser && (
          <div className="border-b-2 mb-2 bg-gray-200 p-3">
            <img
              className="h-6 w-6 my-1 rounded-[50%]"
              src={selectedUser.avatar}
              alt={selectedUser.name}
              loading="lazy"
            />
            <h1 className="font-extrabold text-md">{selectedUser.name}</h1>
          </div>
        )}
        <div
          id="messages-container"
          className="grid h-[80%] overflow-auto rounded-sm"
        >
          {messages.length === 0 ? (
            <p>No messages for this chat</p>
          ) : (
            messages.map((msg, index) => {
              const lastMsg = messages.length - 1 === index;
              return (
                <div
                  key={index}
                  ref={lastMsg ? msgRef : null}
                  className={`flex flex-col ${
                    msg.fromSelf ? "justify-self-end" : "justify-self-start"
                  } w-[70%] mb-20`}
                >
                  <Message {...msg} />
                </div>
              );
            })
          )}
        </div>
        <form
          className="absolute w-full bottom-0 flex flex-row gap-2 justify-between"
          onSubmit={handleSubmit}
        >
          <textarea
            className="form__input rounded basis-3/4"
            name="message"
            placeholder="Type message..."
            onChange={handleChange}
            id="msg"
            rows={3}
            value={textMsg}
          ></textarea>
          <div className="basis-1/4 justify-center items-center align-middle">
            <button className="btn w-full" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </SocketProvider>
  );
}
