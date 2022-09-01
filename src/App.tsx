import React from "react";
import { Chats, Messages, Tasks } from "./components";

export default function App() {
  return (
    <div className="flex flex-row p-5 gap-4">
      <Chats />
      <Messages />
      <Tasks />
    </div>
  );
}
