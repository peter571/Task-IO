import React, { useContext, useEffect, useState } from "react";
import { MODALS } from "../../constants";
import { ModalContext } from "../../context/ModalContext";
import JoinSpaceModal from "./JoinSpaceModal";
import NewSpace from "./NewSpace";
import Space from "./Space";
import { useGetUserWorkSpacesQuery } from "../../features/api/workspaceApi";
import { useAccountContext } from "../../context/AccountContext";

export default function Spaces() {
  const { openModal, closeModal, newSpaceModal, joinSpaceModal } =
    useContext(ModalContext);

 
  const { user } = useAccountContext()

  const { data: userWorkSpaces = []} = useGetUserWorkSpacesQuery({ userId: user.userId, user_email: user.email })

  return (
    <div className="screen-wrapper">
      <div className="div-container">
        {userWorkSpaces.length === 0 ? (
          <h1>No spaces available</h1>
        ) : (
          userWorkSpaces.map((space: any) => <Space key={space._id} {...space} />)
        )}
        <button onClick={() => openModal(MODALS.newSpaceModal)} className="btn">
          Create space+
        </button>
        <button
          onClick={() => openModal(MODALS.joinSpaceModal)}
          className="btn"
        >
          Join new space
        </button>
        <NewSpace
          isOpen={newSpaceModal}
          onClose={() => closeModal(MODALS.newSpaceModal)}
        />
        <JoinSpaceModal
          isOpen={joinSpaceModal}
          onClose={() => closeModal(MODALS.joinSpaceModal)}
        />
      </div>
    </div>
  );
}
