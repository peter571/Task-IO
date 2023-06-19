import React, { useRef } from "react";
import { useNewNoteMutation } from "../../features/api/noteApi";
import { useAccountContext } from "../../context/AccountContext";
import { useParams } from "react-router-dom";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";

export default function NoteForm({
  setShowNoteForm,
}: {
  setShowNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [newNote, { isLoading }] = useNewNoteMutation();
  const { user } = useAccountContext();
  const { spaceId } = useWorkSpaceContext();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const payload = await newNote({
        title: titleRef.current?.value,
        text: textRef.current?.value,
        user: user.userId,
        workspace_id: spaceId,
      }).unwrap();
      if (titleRef.current?.value && textRef.current?.value) {
        titleRef.current.value = "";
        textRef.current.value = "";
      }
      setShowNoteForm(false);
    } catch (error) {}
  }

  return (
    <form className="flex flex-col my-1" onSubmit={handleSubmit}>
      <input
        ref={titleRef}
        name="title"
        type="text"
        className="form__input"
        placeholder="Enter title.."
        required
      />
      <textarea
        ref={textRef}
        placeholder="Enter your note..."
        name="notes"
        id="notes"
        rows={4}
        className="form__input"
        required
      ></textarea>
      <button className="btn my-1" type="submit" disabled={isLoading}>
        Save
      </button>
    </form>
  );
}
