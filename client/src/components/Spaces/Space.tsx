import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SpacePropRender } from "../../types";
import { FaLongArrowAltRight } from "react-icons/fa";
import { formatTitle } from "../../utils/formatTitle";
import { formatUrlString } from "../../utils/formatUrlString";

export default function Space(props: SpacePropRender) {
  const navigate = useNavigate();

  function handleClick() {
    sessionStorage.setItem(
      formatUrlString(props.name),
      JSON.stringify(props._id)
    );
    navigate(`/spaces/${formatUrlString(props.name)}`);
  }

  return (
    <div
      onClick={handleClick}
      className="flex flex-row align-middle gap-2 cursor-pointer p-2 rounded-md hover:bg-regular-fade relative border"
    >
      <div className="flex justify-center items-center h-12 w-12 rounded-lg text-white bg-custom-blue font-bold text-xl">
        {formatTitle(props.name)}
      </div>
      <div className="">
        <h1 className="font-semibold text-custom-blue">{props.name}</h1>
        <p className="text-custom-blue text-xs font-semibold">
          {props.members.length}{" "}
          <span>{props.members.length < 2 ? "Member" : "Members"}</span>
        </p>
      </div>
      <FaLongArrowAltRight
        color="#6368D9"
        className="absolute right-2 inset-y-1/3"
        size={25}
      />
    </div>
  );
}
