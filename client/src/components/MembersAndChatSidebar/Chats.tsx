import React from "react";
import { Accordion } from "flowbite-react";
import Member from "components/MembersAndChatSidebar/Member";
import { useGetUserChatsQuery } from "features/api/chatApi";
import { useAccountContext } from "context/AccountContext";
import NoConversation from "components/MembersAndChatSidebar/NoConversation";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";
import Loader from "components/Loader/Loader";

export default function Chats() {
  const { user } = useAccountContext();
  const { spaceId } = useWorkSpaceContext();
  const {
    data: userChats = [],
    isSuccess,
    isLoading,
  } = useGetUserChatsQuery({
    workspace_id: spaceId,
    userId: user.userId,
  });

  return (
    <Accordion className="">
      <Accordion.Panel>
        <Accordion.Title>
          <span className="text-custom-blue font-semibold">Direct messages</span>
        </Accordion.Title>
        <Accordion.Content>
          {isLoading && <Loader />}
          {!isLoading &&
            userChats.length > 0 &&
            userChats.map((user: any, idx: number) => {
              return (
                <Member key={idx} {...user["members"][0]} showLastMsg={true} />
              );
            })}
          {userChats.length === 0 && isSuccess && <NoConversation />}
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
