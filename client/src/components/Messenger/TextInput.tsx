import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import {
  addNewMessage,
  updateConversations,
} from "../../features/message/messageSlice";
import { userSelector } from "../../features/users/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/hook";
import { Socket } from 'socket.io-client'
import { spacesSelector, updateUserConnection, updateUserHasMsg } from "../../features/spaces/spaceSlice";

interface TextInputProp {
  socket: Socket
}

export function TextInput() {
  const { selectedUserId, user } = useAppSelector(userSelector);
  const [textMsg, setTextMsg] = useState("");
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const { spaceMembers } = useAppSelector(spacesSelector);

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

        const content = {
          createdAt: Date.now(),
          message: msgDetails.text,
          senderAvatar: msgDetails.senderAvatar
        }

        socket.emit("private message", {
          content,
          to: selectedUserId,
        });

        dispatch(addNewMessage(msgDetails));
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
      "private message",
      ({ content, from, to }) => {
        const msg = {
          fromSelf: user?.userId === from,
          senderAvatar: content.senderAvatar,
          message: content.message,
          createdAt: content.createdAt
        };

        console.log(content)

        dispatch(updateConversations(msg));

        for (let i = 0; i < spaceMembers.length; i++) {
          const currentUser = spaceMembers[i];

          if (currentUser.userId !== selectedUserId) {
            dispatch(updateUserHasMsg({ id: selectedUserId, hasNewMessages: true }))
          }
        }
      }
    );

    socket.on("user disconnected", (id) => {
      for (let i = 0; i < spaceMembers.length; i++) {
        const usr = spaceMembers[i];
        if (usr.userId === id) {
          dispatch(updateUserConnection({ id: id, isConnected: false }))
          break;
        }
      }
    });

    socket.on("user connected", (usr) => {
      for (let i = 0; i < spaceMembers.length; i++) {
        const existingUser = spaceMembers[i];
        if (existingUser.userId === usr.userID) {
          dispatch(updateUserConnection({ id: usr.userID, isConnected: true }))
          return;
        }
      }
    });

    socket.on("users", (users) => {
      console.log(users)
      users.forEach((usr: any) => {
        for (let i = 0; i < spaceMembers.length; i++) {
          const existingUser = spaceMembers[i];
          if (existingUser.userId === usr.userID) {
            dispatch(updateUserConnection({ id: usr.userID, isConnected: true }))
            return;
          }
        }
      })
    });


    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("private message");
    };

  }, []);

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
