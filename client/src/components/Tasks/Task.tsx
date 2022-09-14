import React from "react";
import { TiTick } from "react-icons/ti";
import { Status } from "../../constants";
import { TaskProp } from "../../types";

export default function Task(props: TaskProp) {
  return (
    <div
      onClick={props.openModal}
      className="border p-2 rounded-md cursor-pointer hover:bg-gray-200"
    >
      <h1>Title: {props.title}</h1>
      <p>Description: {props.description}</p>
      <p
        className={`flex flex-row align-middle items-center ${
          props.status === Status.COMPLETED
            ? "text-green-600"
            : "text-yellow-300"
        }`}
      >
        {props.status} {props.status === Status.COMPLETED && <TiTick />}
      </p>
      {props.status === Status.PENDING && <p>To submit: {props.dateline}</p>}
    </div>
  );
}