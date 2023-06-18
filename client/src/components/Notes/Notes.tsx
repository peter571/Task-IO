import React, { useState } from "react";
import { MdEditNote } from "react-icons/md";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";

export default function Notes() {
  const [showNoteForm, setShowNoteForm] = useState(false);

  return (
    <div className="p-2">
      <button
        type="button"
        className="btn text-center"
        onClick={() => setShowNoteForm((prev) => !prev)}
      >
        <span className="mr-2">Create note</span>
        <MdEditNote className="text-center" size={15} />{" "}
      </button>
      {showNoteForm && <NoteForm setShowNoteForm={setShowNoteForm} />}
      <NotesList />
    </div>
  );
}
