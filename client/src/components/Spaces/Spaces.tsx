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
  const [fetchedSpaces, setFetchedSpaces] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        if (user) {
          const spaces = await dispatch(
            getUserSpacesByUserId(user.userId)
          ).unwrap();
          setFetchedSpaces(spaces);
        }
      } catch (error) {}
    };
    fetchSpaces();
  }, []);

  if (userSpaces.length === 0) return <CreateSpace />;

  return (
    <div className="screen-wrapper">
      <div className="div-container">
        {userSpaces.map((space) => (
          <Space key={space._id} {...space} />
        ))}
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
