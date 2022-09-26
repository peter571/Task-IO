import React, { useState } from "react";
import {
  spacesSelector,
  createNewSpace,
  getUserSpacesByUserId
} from "../../features/spaces/spaceSlice";
import { userSelector } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { NewSpaceProp, SpaceProp } from "../../types";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

export default function NewSpace(props: NewSpaceProp) {
  const { user } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const [newSpace, setNewSpace] = useState<SpaceProp>({
    avatar: "",
    title: "",
    members: [] as any[],
    creator: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (user) {
        const space = {
          ...newSpace,
          members: [user],
          creator: user.userId,
        };

        await dispatch(
          createNewSpace(space)
        );

        await dispatch(getUserSpacesByUserId(user.userId));
      }
    } catch (error) {}
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewSpace({ ...newSpace, [e.target.name]: e.target.value });
  }

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onload = function () {
      const imgUrl = reader.result;
      setNewSpace({ ...newSpace, avatar: imgUrl });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <ModalWrapper isOpen={props.isOpen} onClose={props.onClose}>
      <form className="div-container w-full py-4" onSubmit={handleSubmit}>
        <input
          placeholder="Enter company name..."
          className="form__input py-2"
          name="title"
          onChange={handleChange}
          type="text"
          required
        />
        <input
          placeholder="Enter company name..."
          className="form__input py-2 cursor-pointer"
          name="avatar"
          onChange={handleImageInput}
          type="file"
        />
        <button className="btn" type="submit">
          Create
        </button>
      </form>
    </ModalWrapper>
  );
}
