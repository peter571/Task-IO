import { Modal } from "flowbite-react";
import React, { SetStateAction, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";
import { useCreateWorkSpaceMutation } from "../../features/api/workspaceApi";
import Loader from "../Loader/Loader";

export default function NewSpace({
  show,
  setOpenNewSpaceModal,
}: {
  show: boolean | undefined;
  setOpenNewSpaceModal: React.Dispatch<SetStateAction<boolean | undefined>>;
}) {
  const { user } = useAccountContext();
  const [createWorkSpace, { isLoading }] = useCreateWorkSpaceMutation();
  const companyNameRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (user) {
        const space = {
          name: companyNameRef.current?.value!,
          members: [user.userId],
          admin: user.userId,
        };
        await createWorkSpace(space)
          .unwrap()
          .then((payload) => {
            setOpenNewSpaceModal(undefined);
            navigate("/");
          });
      }
    } catch (error) {}
  }

  return (
    <Modal show={show} onClose={() => setOpenNewSpaceModal(undefined)}>
      <Modal.Header>
        <span className="text-custom-blue">Create new space</span>
      </Modal.Header>
      <Modal.Body>
        <form
          className="div-container w-full py-4 space-y-6"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Enter company name..."
            className="form__input py-2"
            name="title"
            ref={companyNameRef}
            type="text"
            required
          />

          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? <Loader /> : "Create"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
