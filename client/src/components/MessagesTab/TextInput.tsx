import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { Button } from "flowbite-react";
import { useAccountContext } from "../../context/AccountContext";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";
import { useNewMessageMutation } from "../../features/api/messageApi";
import { useParams } from "react-router-dom";

export function TextInput() {
  const { user } = useAccountContext();
  const [textMsg, setTextMsg] = useState("");
  const { selectedChat, selectedUser } = useWorkSpaceContext();
  const [sendMessage, { isLoading }] = useNewMessageMutation();
  const { spaceId } = useParams();

  const { socket } = useSocket();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const payload = await sendMessage({
        content: textMsg,
        receiver: selectedUser,
        sender: user.userId,
        workspace_id: spaceId,
        chat_id: selectedChat,
      }).unwrap();
      setTextMsg("")
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<any>) {
    setTextMsg(e.target.value);
  }

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
        <Button
          color="success"
          className="w-full"
          type="submit"
          disabled={textMsg.length === 0}
        >
          Send
        </Button>
      </div>
    </form>
  );
}
