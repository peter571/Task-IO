import React, { useState } from "react";
import { BiHome } from "react-icons/bi";
import { useNavigate} from "react-router-dom";
import { useAccountContext } from "context/AccountContext";
import {
  useGetWorkSpaceQuery,
} from "features/api/workspaceApi";
import InviteMember from "components/Modals/InviteMember";
import AllWorkSpaceMembers from "components/MembersAndChatSidebar/AllWorkSpaceMembers";
import Chats from "components/MembersAndChatSidebar/Chats";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";

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
      <div className="basis-1/8 flex flex-row items-center">
        <h1 className="bold-title p-3" onClick={() => navigate("/")}>
          <BiHome color="#6368D9" />
        </h1>
        <h2 className="text-sm font-bold text-custom-blue">{user && user.name}</h2>
      </div>
      <h1 className="font-bold basis-1/8 px-3 bold-title text-custom-blue">
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
