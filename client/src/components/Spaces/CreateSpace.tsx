import React, { useContext } from "react";
import { MODALS } from "../../constants";
import { ModalContext } from "../../context/ModalContext";
import JoinSpaceModal from "./JoinSpaceModal";
import NewSpace from "./NewSpace";

export default function CreateSpace() {
  const { openModal, closeModal, newSpaceModal, joinSpaceModal } = useContext(ModalContext);
  
  return (
    <div className="screen-wrapper">
      <div className="div-container">
        <h1>You are currently not a member or do not have any space</h1>
        <button onClick={() => openModal(MODALS.newSpaceModal)} className="btn">
          Create space+
        </button>
        <button onClick={() => openModal(MODALS.joinSpaceModal)} className="btn">
          Join space
        </button>
      </div>
      <NewSpace isOpen={newSpaceModal} onClose={() => closeModal(MODALS.newSpaceModal)} />
      <JoinSpaceModal isOpen={joinSpaceModal} onClose={() => closeModal(MODALS.joinSpaceModal)} />
    </div>
  );
}
