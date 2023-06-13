import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import { BiHome } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { TiMessage } from "react-icons/ti";
import { useAccountContext } from "../../context/AccountContext";
import { useGetWorkSpaceMembersQuery } from "../../features/api/workspaceApi";
import InviteMember from "../Modals/InviteMember";

export default function Chats() {
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const { data: spaceMembers = [] } = useGetWorkSpaceMembersQuery(spaceId);
  const { user } = useAccountContext();
  const [showInviteMemberModal, setOpenInviteMemberModal] = useState<
    boolean | undefined
  >(undefined);

  console.log(spaceMembers)

  return (
    <div className="flex flex-col gap-4 h-full bg-[#EAF1FB] w-1/5">
      <div className="basis-1/8">
        <h1 className="logo p-3" onClick={() => navigate("/")}>
          <BiHome />
        </h1>
      </div>
      <h1 className="font-bold basis-1/8 px-3">Members</h1>
      <div className="basis-3/4 flex flex-col gap-2 overflow-auto relative">
        {/* Display this when their is only one space member: The workspace creator */}
        {spaceMembers.length === 1 && (
          <div className="flex flex-col justify-center items-center absolute top-1/3 left-1/3">
            <TiMessage color="gray" size={25} />
            <p className="text-sm font-semibold text-gray-500">
              No Conversation
            </p>
          </div>
        )}
        {/* Display the space members here */}
        {spaceMembers.map((member: any, index: number) => {
          if (member.userId !== user?.userId) {
            return <Chat key={index} {...member} />;
          }
        })}
      </div>

      <div className="">
        <button className="btn" onClick={() => setOpenInviteMemberModal(true)}>+ New member</button>
      </div>

      <InviteMember
        show={showInviteMemberModal}
        setOpenInviteMemberModal={setOpenInviteMemberModal}
      />
    </div>
  );
}
