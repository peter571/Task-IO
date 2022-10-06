import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SpacePropRender } from "../../types";
import { getSpaceMembersBySpaceId } from "../../features/spaces/spaceSlice";
import { useAppDispatch } from "../../hooks/hook";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

export default function Space(props: SpacePropRender) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refId = useRef<HTMLParagraphElement | null>(null!);

  useEffect(() => {
    dispatch(getSpaceMembersBySpaceId(props._id));
  }, []);

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
      className="flex flex-row align-middle gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200"
    >
      <img
        className="h-12 w-12 rounded-[25%]"
        src={props.avatar}
        alt={props.title}
        loading="lazy"
      />
      <div className="">
        <h1 className="font-semibold">{props.title}</h1>
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
    </div>
  );
}
