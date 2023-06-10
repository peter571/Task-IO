import React, { useRef } from "react";
import { NewSpaceProp, SpaceProp } from "../../types";
import Loader from "../Loader/Loader";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { useCreateWorkSpaceMutation } from "../../features/api/workspaceApi";
import { useAccountContext } from "../../context/AccountContext";
import { useNavigate } from "react-router-dom";

export default function NewSpace(props: NewSpaceProp) {
  
  const { user } = useAccountContext();
  const [createWorkSpace, { isLoading }] = useCreateWorkSpaceMutation();
  const companyNameRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (user) {
        const space = {
          name: companyNameRef.current?.value!,
          members: [user.email],
          admin: user.userId,
        };
        await createWorkSpace(space).unwrap().then((payload) => {
          navigate('/')
        });
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
