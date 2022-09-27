import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { JoinSpaceProp } from "../../types";
import {
  addMemberToSpace,
  getUserSpacesByUserId,
} from "../../features/spaces/spaceSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { userSelector } from "../../features/users/userSlice";
import { toast } from "react-toastify";
import { STATE } from "../../constants";
import Loader from "../Loader/Loader";

export default function JoinSpaceModal(props: JoinSpaceProp) {
  const [spaceId, setSpaceId] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userSelector);
  const [isloading, setIsLoading] = useState<STATE>(STATE.IDLE);
  const pending = isloading === STATE.PENDING;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (user) {
        setIsLoading(STATE.PENDING);
        const space = await dispatch(
          addMemberToSpace({ spaceId, user })
        ).unwrap();
        setIsLoading(STATE.SUCCESS);
        setSpaceId("");
        toast.success(`You joined ${space.title} space!`);
        await dispatch(getUserSpacesByUserId(user.userId));
      }
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
