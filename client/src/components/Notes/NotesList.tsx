import React from "react";
import { useGetUserNotesQuery } from "../../features/api/noteApi";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";
import { NoteProp } from "../../types";
import Note from "./Note";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";
import Loader from "../Loader/Loader";

export default function NotesList() {
  const { spaceId } = useWorkSpaceContext();
  const { user } = useAccountContext();
  const {
    data: notes = [],
    isLoading,
  } = useGetUserNotesQuery({
    workspace_id: spaceId,
    userId: user.userId,
  });

  return (
    <div className="my-2">
      {isLoading && <Loader />}
      {!isLoading &&
        notes.length > 0 &&
        notes.map((note: NoteProp, idx: number) => (
          <Note key={idx} {...note} />
        ))}
    </div>
  );
}
