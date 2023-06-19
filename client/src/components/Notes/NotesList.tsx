import React from "react";
import { useGetUserNotesQuery } from "../../features/api/noteApi";
import { useParams } from "react-router-dom";
import { useAccountContext } from "../../context/AccountContext";
import { NoteProp } from "../../types";
import Note from "./Note";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";

export default function NotesList() {
  const { spaceId } = useWorkSpaceContext();
  const { user } = useAccountContext();
  const { data: notes = [], isSuccess } = useGetUserNotesQuery({
    workspace_id: spaceId,
    userId: user.userId,
  });

  return (
    <div className="my-2">
      {isSuccess && notes.map((note: NoteProp, idx: number) => (
        <Note key={idx} {...note} />
      ))}
    </div>
  );
}
