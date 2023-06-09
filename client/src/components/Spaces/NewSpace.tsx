import React, { useRef } from "react";
import { NewSpaceProp, SpaceProp } from "../../types";
import Loader from "../Loader/Loader";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { useCreateWorkSpaceMutation } from "../../features/api/workspaceApi";
import { useAccountContext } from "../../context/AccountContext";

export default function NewSpace(props: NewSpaceProp) {
  
  const { user } = useAccountContext();
  const [createWorkSpace, { data, isLoading }] = useCreateWorkSpaceMutation();
  const companyNameRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (user) {
        const space = {
          name: companyNameRef.current?.value!,
          members: [user.userId],
          admin: user.userId,
        };
        await createWorkSpace(space).then(() => {});
      }
    } catch (error) {}
  }

  return (
    <ModalWrapper isOpen={props.isOpen} onClose={props.onClose}>
      <form className="div-container w-full py-4" onSubmit={handleSubmit}>
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
    </ModalWrapper>
  );
}
