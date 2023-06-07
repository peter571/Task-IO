import React, { useEffect } from "react";
import Chat from "./Chat";
import { BiHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";
import { spacesSelector } from "../../features/spaces/spaceSlice";
import { userSelector } from "../../features/users/userSlice";
import { TiMessage } from "react-icons/ti";

export default function Chats() {
  const navigate = useNavigate();
  const { spaceMembers } = useAppSelector(spacesSelector);
  const { user } = useAppSelector(userSelector);

  return (
    <div className="flex flex-col gap-4 h-full bg-[#EAF1FB] w-1/5">
      <div className="basis-1/8">
        <h1 className="logo p-3" onClick={() => navigate("/spaces")}>
          <BiHome />
        </h1>
      </div>
      <h1 className="font-bold basis-1/8 px-3">Members</h1>
      <div className="basis-3/4 flex flex-col gap-2 overflow-auto relative">
        {/* Display this when their is only one space member: The workspace creator */}
        {spaceMembers.length === 1 && (
          <div className="flex flex-col justify-center items-center absolute top-1/3 left-1/3">
            <TiMessage color="gray" size={25} />
            <p className="text-sm font-semibold text-gray-500">No Conversation</p>
          </div>
        )}
        {/* Display the space members here */}
        {spaceMembers.map((member, index) => {
          if (member.userId !== user?.userId) {
            return <Chat key={index} {...member} />;
          }
        })}
      </div>

      <div className="">
        <button className="btn">+ New member</button>
      </div>
    </div>
  );
}
