import React from "react";

export default function Messages() {
  return (
    <div className="basis-1/2 h-screen relative">
      <h1>Messages</h1>
      <div className="bg-gray-200 h-[80%] rounded-sm"></div>
      <div className="absolute w-full bottom-0 flex flex-row gap-2 justify-between">
        <textarea
          className="form__input rounded basis-3/4"
          name="message"
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
