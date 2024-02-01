import React, { useEffect, useRef, useState } from "react";
import { NoteProp } from "@/types";
import { useUpdateNoteMutation } from "features/api/noteApi";
import { MdDeleteOutline } from "react-icons/md";
import DeleteNote from "components/Modals/DeleteNote";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";

export default function Note(props: NoteProp) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);
  const formRef = useRef<HTMLFormElement>(null);
  const [updateNote, { isLoading }] = useUpdateNoteMutation();
  const [show, setShowDeleteNoteModal] = useState<boolean | undefined>(
    undefined
  );
  const { selectedNoteId, setSelectedNote } = useWorkSpaceContext();

  const toggleEditMode = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsEditMode(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = await updateNote({
        title: title,
        text: text,
        note_id: props._id,
      }).unwrap();
    } catch (error) {}
    setIsEditMode(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsEditMode(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-0 p-2 rounded-md shadow-md bg-fade-blue hover:bg-regular-fade mb-3 relative">
      {!isEditMode && (
        <span className="hover:bg-gray-500 rounded-full absolute right-2 top-2 p-1">
          <MdDeleteOutline
            role="button"
            size={15}
            onClick={() => {
              setSelectedNote(props._id);
              setShowDeleteNoteModal(true);
            }}
            color="white"
          />
        </span>
      )}

      <div className="p-2 cursor-pointer" onClick={toggleEditMode}>
        {isEditMode ? (
          <form
            ref={formRef}
            className="flex flex-col"
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              value={title}
              className="form__input"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              value={text}
              className="form__input"
              onChange={(e) => setText(e.target.value)}
              rows={4}
              required
            />
            <button className="btn my-1" type="submit">
              Save
            </button>
          </form>
        ) : (
          <>
            <h1 className="font-bold text-base text-custom-blue">{title}</h1>
            <p className="text-sm text-custom-blue">{text}</p>
          </>
        )}
      </div>
      <DeleteNote show={show} setShowDeleteNoteModal={setShowDeleteNoteModal} />
    </div>
  );
}
