import React from "react";
import { useGetWorkSpaceMembersQuery } from "../../features/api/workspaceApi";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";
import Member from "./Member";
import { Accordion } from "flowbite-react";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";

export default function AllWorkSpaceMembers() {
  const { spaceId } = useWorkSpaceContext();
  const { data: spaceMembers = [] } = useGetWorkSpaceMembersQuery(spaceId);
  
  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>All Members</Accordion.Title>
        <Accordion.Content>
          {spaceMembers.map((member: any, index: number) => {
            return <Member key={index} {...member} />;
          })}
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
