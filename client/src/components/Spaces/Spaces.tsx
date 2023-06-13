import React, { useContext, useEffect, useState } from "react";
import Space from "./Space";
import { useGetUserWorkSpacesQuery } from "../../features/api/workspaceApi";
import { useAccountContext } from "../../context/AccountContext";
import NewSpace from "../Modals/NewSpace";

export default function Spaces() {
  const [showSpaceModal, setOpenNewSpaceModal] = useState<boolean | undefined>(
    undefined
  );
  const { user } = useAccountContext();
  const { data: userWorkSpaces = [] } = useGetUserWorkSpacesQuery({
    userId: user.userId,
    user_email: user.email,
  });

  return (
    <div className="screen-wrapper">
      <div className="div-container">
        {userWorkSpaces.length === 0 ? (
          <h1>No spaces available</h1>
        ) : (
          userWorkSpaces.map((space: any) => (
            <Space key={space._id} {...space} />
          ))
        )}
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
