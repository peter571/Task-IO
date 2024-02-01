import React, { useState } from "react";
import Space from "./Space";
import { useGetUserWorkSpacesQuery } from "../../features/api/workspaceApi";
import { useAccountContext } from "../../context/AccountContext";
import NewSpace from "../Modals/NewSpace";
import Loader from "../Loader/Loader";

export default function Spaces() {
  const [showSpaceModal, setOpenNewSpaceModal] = useState<boolean | undefined>(
    undefined
  );
  const { user } = useAccountContext();
  
  const { data: userWorkSpaces = [], isLoading } = useGetUserWorkSpacesQuery({
    userId: user.userId,
    user_email: user.email,
  });
  console.log(user, userWorkSpaces.length)

  return (
    <div className="screen-wrapper">
      <div className="div-container">
        {userWorkSpaces.length === 0 && !isLoading ? (
          <h1 className="text-center text-custom-gray text-bold">
            No workspaces available
          </h1>
        ) : (
          userWorkSpaces.map((space: any) => (
            <Space key={space._id} {...space} />
          ))
        )}
        {isLoading && <Loader />}
        <button onClick={() => setOpenNewSpaceModal(true)} className="btn">
          Create space+
        </button>

        <NewSpace
          show={showSpaceModal}
          setOpenNewSpaceModal={setOpenNewSpaceModal}
        />
      </div>
    </div>
  );
}
