import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import {
  addNewMessage,
  updateConversations,
} from "../../features/message/messageSlice";
import { userSelector } from "../../features/users/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";

export function TextInput() {
  const { selectedUserId, user } = useAppSelector(userSelector);
  const [textMsg, setTextMsg] = useState("");
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

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
        socket?.emit("send-message", {
          recipients: msgDetails.users,
          createdAt: Date.now(),
          message: msgDetails.text,
          senderAvatar: msgDetails.senderAvatar,
        });
        await dispatch(addNewMessage(msgDetails)).unwrap();
        dispatch(
          updateConversations({
            fromSelf: true,
            createdAt: Date.now(),
            message: msgDetails.text,
            senderAvatar: msgDetails.senderAvatar,
          })
        );
        setTextMsg("");
      }
    } catch (error) {
        console.log(error)
    }
  }

  function handleChange(e: React.ChangeEvent<any>) {
    setTextMsg(e.target.value);
  }

  useEffect(() => {
    if (socket == null) return;
    socket.on(
      "receive-message",
      ({ sender, message, createdAt, senderAvatar }) => {
        const msg = {
          fromSelf: user?.userId === sender,
          senderAvatar,
          message,
          createdAt,
        };
        console.log(msg);
        dispatch(updateConversations(msg));
      }
    );
    return () => {
      socket.off("receive-message");
    };
  }, [socket, handleSubmit]);

  return (
    <form
      className="w-full flex flex-row gap-2 justify-between"
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
        required
      ></textarea>
      <div className="basis-1/4 justify-center items-center align-middle">
        <button className="btn w-full" type="submit" disabled={textMsg.length === 0}>
          Send
        </button>
      </div>
    </form>
  );
}
