import React from "react";

export default function MessageActions({
  modalRef,
  handleDeleteMessage,
  handleEditMessage,
}: {
  modalRef: React.RefObject<HTMLDivElement>;
  handleDeleteMessage:
    | React.MouseEventHandler<HTMLParagraphElement>
    | undefined;
  handleEditMessage: React.MouseEventHandler<HTMLParagraphElement> | undefined;
}) {
  return (
    <div
      ref={modalRef}
      className={`absolute right-1 transform -translate-x-1/2 bg-gray-600 rounded-md shadow-md p-4 w-52`}
    >
      <div className="flex flex-col gap-3">
        <p
          role="button"
          className="hover:bg-gray-500 rounded-md px-2 py-1 text-slate-100"
          onClick={handleEditMessage}
        >
          <span>Edit message</span>
        </p>
        <p
          role="button"
          className="hover:bg-gray-500 rounded-md px-2 py-1 text-red-500"
          onClick={handleDeleteMessage}
        >
          <span>Delete message</span>
        </p>
      </div>
    </div>
  );
}
