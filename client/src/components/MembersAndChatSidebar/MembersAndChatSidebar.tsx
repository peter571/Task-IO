import React, { useEffect, useState } from "react";
import { BiHome } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";
import {
  useGetWorkSpaceMembersQuery,
  useGetWorkSpaceQuery,
} from "../../features/api/workspaceApi";
import InviteMember from "../Modals/InviteMember";
import AllWorkSpaceMembers from "./AllWorkSpaceMembers";
import Chats from "./Chats";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";

export default function MembersAndChatSidebar() {
  const navigate = useNavigate();
  
  const { userIsAdmin, spaceId } = useWorkSpaceContext();
  const { data: workspace, isSuccess: spaceLoaded } =
    useGetWorkSpaceQuery(spaceId);
  const { user } = useAccountContext();
  const [showInviteMemberModal, setOpenInviteMemberModal] = useState<
    boolean | undefined
  >(undefined);

  return (
    <div className="flex flex-col gap-4 h-full bg-[#EAF1FB] w-1/5">
      <div className="basis-1/8">
        <h1 className="logo p-3" onClick={() => navigate("/")}>
          <BiHome />
        </h1>
      </div>
      <h1 className="font-bold basis-1/8 px-3">
        {spaceLoaded && workspace.name}
      </h1>
      <div className="basis-3/4 flex flex-col gap-2 overflow-auto relative">
        {/* Display all the user chats  */}
        <Chats />
        {/* Display the space members */}
        <AllWorkSpaceMembers />
      </div>

      <div className="p-3">
        {userIsAdmin && (
          <button
            className="btn"
            onClick={() => setOpenInviteMemberModal(true)}
          >
            + Add new member
          </button>
        )}
      </div>

      <InviteMember
        show={showInviteMemberModal}
        setOpenInviteMemberModal={setOpenInviteMemberModal}
      />
    </div>
  );
}
