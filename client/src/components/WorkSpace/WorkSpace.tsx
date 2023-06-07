import React from 'react'
import Chats from '../Chats/Chats';
import Messages from '../Messages/Messages';
import Tasks from '../Tasks/Tasks';

export default function WorkSpace () {
    return (
      <div className="flex flex-row gap-1 divide-x h-screen">
        <Chats />
        <Messages />
        <Tasks />
      </div>
    );
  };
