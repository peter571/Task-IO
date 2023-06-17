import { Accordion } from "flowbite-react";
import React from "react";
import Member from "./Member";
import { useGetUserChatsQuery } from "../../features/api/chatApi";
import { useAccountContext } from "../../context/AccountContext";
import { useParams } from "react-router-dom";
import NoConversation from "./NoConversation";

export default function Chats() {
  const { user } = useAccountContext();
  const { spaceId } = useParams();
  const { data: userChats = [], isSuccess } = useGetUserChatsQuery({
    workspace_id: spaceId,
    userId: user.userId,
  });

  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>Direct messages</Accordion.Title>
        <Accordion.Content>
          {userChats.map((user: any, idx: number) => {
            
            return <Member key={idx} {...user["members"][0]} showLastMsg={true} />;
          })}
          {userChats.length === 0 && isSuccess && <NoConversation />}
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
