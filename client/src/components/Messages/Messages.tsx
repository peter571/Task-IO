import React from "react";
import Message from "./Message";

export default function Messages() {
  
  return (
    <div className="basis-1/2 h-screen relative">
      <h1>Conversations</h1>
      <div id="messages-container" className="grid p-5 h-[80%] overflow-auto rounded-sm">
      <Message own={false} />
      
      </div>
      <div className="absolute w-full bottom-0 flex flex-row gap-2 justify-between">
        <textarea
          className="form__input rounded basis-3/4"
          name="message"
          placeholder="Type message..."
          id="msg"
          rows={3}
        ></textarea>
        <div className="basis-1/4 justify-center items-center align-middle">
          <button className="btn w-full">Send</button>
        </div>
      </div>
    </div>
  );
}
