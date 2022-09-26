import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpacePropRender } from "../../types";
import { getSpaceMembersBySpaceId } from "../../features/spaces/spaceSlice";
import { useAppDispatch } from "../../hooks/hook";

export default function Space(props: SpacePropRender) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSpaceMembersBySpaceId(props._id))
  }, [])

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
      <div>
        <h1 className="font-semibold">{props.title}</h1>
        <p className="font-light text-sm">{props._id}</p>
      </div>
    </div>
  );
}
