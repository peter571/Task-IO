import React from "react";
import { useGetUserNotesQuery } from "features/api/noteApi";
import { useAccountContext } from "context/AccountContext";
import { NoteProp } from "@/types";
import Note from "components/Notes/Note";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";
import Loader from "components/Loader/Loader";

export default function NotesList() {
  const { spaceId } = useWorkSpaceContext();
  const { user } = useAccountContext();
  const { data: notes, isLoading } = useGetUserNotesQuery({
    workspace_id: spaceId,
    userId: user.userId,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="my-2">
      {notes && notes.length === 0 && (
        <p className="my-5 text-sm">No notes found</p>
      )}
      {notes &&
        notes.length > 0 &&
        notes.map((note: NoteProp, idx: number) => (
          <Note key={idx} {...note} />
        ))}
    </div>
  );
}
