import React, { useEffect } from "react";
import Chat from "./Chat";
import { BiHome } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";
import { spacesSelector } from "../../features/spaces/spaceSlice";
import { userSelector } from "../../features/users/userSlice";
import { useSocket } from "../../context/SocketContext";

export default function Chats() {
  const navigate = useNavigate();
  const { spaceMembers } = useAppSelector(spacesSelector);
  const { user } = useAppSelector(userSelector);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="basis-1/8">
        <h1 className="logo" onClick={() => navigate("/spaces")}>
          <BiHome />
        </h1>
      </div>
      <h1 className="font-bold basis-1/8">Members</h1>
      <div className="basis-3/4 flex flex-col gap-2 overflow-auto">
        {spaceMembers.map((member, index) => {
          if (member.userId !== user?.userId) {
            return <Chat key={index} {...member} />;
          }
        })}
      </div>

      <div className="">
        <button className="btn">New member</button>
      </div>
    </div>
  );
}
