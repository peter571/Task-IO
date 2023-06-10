import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SpacePropRender } from "../../types";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { FaLongArrowAltRight } from "react-icons/fa";
import { formatWorkspaceTitle } from "../../utils/formatWorkspaceTitle";

export default function Space(props: SpacePropRender) {
  const navigate = useNavigate();
  const refId = useRef<HTMLParagraphElement | null>(null!);

  function copyLink(e: React.MouseEvent<SVGElement, MouseEvent>) {
    e.stopPropagation();
    const spaceIdText = refId.current?.textContent;
    if (spaceIdText) {
      navigator.clipboard.writeText(spaceIdText);
      toast.success(`Copied space Id: ${spaceIdText}!`);
    }
  }

  return (
    <div
      onClick={() => navigate(`/spaces/${props._id}`)}
      className="flex flex-row align-middle gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 relative border"
    >
      <div className="flex justify-center items-center h-12 w-12 rounded-[25%] text-white bg-black font-bold text-xl">
        {formatWorkspaceTitle(props.name)}
      </div>
      <div className="">
        <h1 className="font-semibold">{props.name}</h1>
        <div className="flex justify-between gap-2">
          <p ref={refId} className="font-light text-sm">
            {props._id}
          </p>
          <MdContentCopy
            size={25}
            className="p-1 bg-gray-200 hover:bg-slate-800 text-blue-500 rounded-md z-0"
            onClick={copyLink}
          />
        </div>
      </div>
      <FaLongArrowAltRight className="absolute right-2 inset-y-1/3" size={25} />
    </div>
  );
}
