import React from "react";
import { getTasksByUserId } from "../../features/tasks/taskSlice";
import { selectUserById, userSelector } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { ChatProp } from "../../types";

export default function Chat(props: ChatProp) {
  const { userId } = props;
  const dispatch = useAppDispatch();
  const { selectedUserId } = useAppSelector(userSelector);
  const isSelected = selectedUserId === userId;

  function selectUser(id: string) {
    dispatch(selectUserById(id));
    dispatch(getTasksByUserId(id))
  }

  return (
    <div
      className={`relative ${
        isSelected && "bg-gray-200"
      } flex flex-row align-middle gap-2 border cursor-pointer p-2 rounded-md hover:bg-gray-200`}
      onClick={() => selectUser(userId)}
    >
      <img
        className="h-10 w-10 rounded-[50%]"
        src={props.avatar}
        alt={props.name}
        loading="lazy"
      />
      <div>
        <h1 className="font-semibold">{props.name}</h1>
        <p className="font-light text-sm">{props.previewText}</p>
      </div>
      <div className="bg-green-500 absolute h-3 w-3 left-3 rounded-[50%]"></div>
    </div>
  );
}
