import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SpacePropRender } from "../../types";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { FaLongArrowAltRight } from "react-icons/fa";
import { formatTitle } from "../../utils/formatTitle";
import { formatUrlString } from "../../utils/formatUrlString";

export default function Space(props: SpacePropRender) {
  const navigate = useNavigate();

  function handleClick(){
    sessionStorage.setItem(formatUrlString(props.name), JSON.stringify(props._id))
    navigate(`/spaces/${formatUrlString(props.name)}`)
  }

  return (
    <div
      onClick={handleClick}
      className="flex flex-row align-middle gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 relative border"
    >
      <div className="flex justify-center items-center h-12 w-12 rounded-[25%] text-white bg-black font-bold text-xl">
        {formatTitle(props.name)}
      </div>
      <div className="">
        <h1 className="font-semibold">{props.name}</h1>
        <p>{props.members.length} <span>{props.members.length < 2 ? "Member" : "Members"}</span></p>
      </div>
      <FaLongArrowAltRight className="absolute right-2 inset-y-1/3" size={25} />
    </div>
  );
}
