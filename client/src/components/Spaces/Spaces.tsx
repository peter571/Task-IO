import React, { useContext, useEffect, useState } from "react";
import { MODALS } from "../../constants";
import { ModalContext } from "../../context/ModalContext";
import {
  spacesSelector,
  getUserSpacesByUserId,
} from "../../features/spaces/spaceSlice";
import { userSelector } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import CreateSpace from "./CreateSpace";
import JoinSpaceModal from "./JoinSpaceModal";
import NewSpace from "./NewSpace";
import Space from "./Space";

export default function Spaces() {
  const { openModal, closeModal, newSpaceModal, joinSpaceModal } =
    useContext(ModalContext);

  const { userSpaces } = useAppSelector(spacesSelector);
  const { user } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserSpacesByUserId(user.userId));
    }
  }, []);

  return (
    <div className="screen-wrapper">
      <div className="div-container">
        {userSpaces.length === 0 ? (
          <h1>No spaces available</h1>
        ) : (
          userSpaces.map((space) => <Space key={space._id} {...space} />)
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
