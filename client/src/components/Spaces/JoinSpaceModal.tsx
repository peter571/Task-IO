import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { JoinSpaceProp } from "../../types";
import { toast } from "react-toastify";
import { STATE } from "../../constants";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";

export default function JoinSpaceModal(props: JoinSpaceProp) {
  const [spaceId, setSpaceId] = useState("");
  const { user } = useAccountContext();
  const [isloading, setIsLoading] = useState<STATE>(STATE.IDLE);
  const pending = isloading === STATE.PENDING;
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
     
    } catch (error) {
      setIsLoading(STATE.FAILED);
      toast.error(`Fialed to join space Id of ${spaceId}!`);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSpaceId(e.target.value);
  }

  return (
    <ModalWrapper isOpen={props.isOpen} onClose={props.onClose}>
      <form className="div-container w-full py-4" onSubmit={handleSubmit}>
        <input
          placeholder="Enter Space id"
          className="form__input py-2"
          type="text"
          onChange={handleChange}
          name="spaceId"
        />
        <button
          className="btn"
          type="submit"
          disabled={pending}
        >
          {pending ? <Loader /> : "Join space"}
        </button>
      </form>
    </ModalWrapper>
  );
}
