import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { Button } from "flowbite-react";
import { useAccountContext } from "../../context/AccountContext";

export function TextInput() {
  const { user } = useAccountContext();
  const [textMsg, setTextMsg] = useState("");
  
  const { socket } = useSocket();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      
    } catch (error) {
      console.log(error)
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
        <Button color="success" className="w-full" type="submit" disabled={textMsg.length === 0}>
          Send
        </Button>
      </div>
    </form>
  );
}
