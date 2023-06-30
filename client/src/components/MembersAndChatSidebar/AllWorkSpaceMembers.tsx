import React from "react";
import { useGetWorkSpaceMembersQuery } from "../../features/api/workspaceApi";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";
import Member from "./Member";
import { Accordion } from "flowbite-react";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";
import Loader from "../Loader/Loader";
import { MemberProp } from "../../types";

export default function AllWorkSpaceMembers() {
  const { spaceId } = useWorkSpaceContext();
  const { user } = useAccountContext()
  const { data: spaceMembers = [], isLoading } =
    useGetWorkSpaceMembersQuery(spaceId);

  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>
          <span className="text-custom-blue font-semibold">All Members</span>
        </Accordion.Title>
        <Accordion.Content>
          {isLoading && <Loader />}
          {!isLoading &&
            spaceMembers.length > 0 &&
            spaceMembers.map((member: any, index: number) => {
              return <Member key={index} {...member} />;
            })}
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
