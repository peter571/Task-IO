import React, { useCallback, useEffect, useRef, useState } from "react";
import { MessageProp } from "@/types";
import { format } from "timeago.js";
import { Avatar } from "flowbite-react";
import { useAccountContext } from "context/AccountContext";
import FilesDisplay from "components/MessagesTab/FilesDisplay";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  useDeleteMessageMutation,
  useEditMessageMutation,
} from "features/api/messageApi";
import MessageActions from "components/Modals/MessageActions";

export default function Message(props: MessageProp) {
  const { user } = useAccountContext();
  const fromSelf = props.sender._id === user.userId;
  const [isHovered, setIsHovered] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [deleteMessage, { isLoading }] = useDeleteMessageMutation();
  const [editMessage] = useEditMessageMutation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [textMsg, setTextMsg] = useState(props.content);
  const formRef = useRef<HTMLFormElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleMoreClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();

    setShowActionsModal((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowActionsModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  async function handleDeleteMessage() {
    try {
      await deleteMessage({
        chatId: props.chat_id,
        messageId: props._id,
      }).unwrap();
      setShowActionsModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleEditMode = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsEditMode((prev) => !prev);
    setShowActionsModal(false);
  };

  async function handleSubmitChanges(e: React.FormEvent) {
    e.preventDefault();

    try {
      await editMessage({
        chatId: props.chat_id,
        messageId: props._id,
        textMsg,
      }).unwrap();
      setIsEditMode(false);
    } catch (error) {}
  }

  return (
    <>
      {isEditMode ? (
        <form
          className="flex flex-col w-full"
          ref={formRef}
          onSubmit={handleSubmitChanges}
        >
          <textarea
            className="msg_input rounded basis-3/4"
            name="message"
            placeholder="Type message..."
            onChange={(e) => setTextMsg(e.target.value)}
            id="msg"
            rows={3}
            value={textMsg}
            style={{ height: "auto" }}
          ></textarea>
          <div className="flex justify-end gap-4 py-1">
            <button
              type="button"
              className="bg-gray-500 text-gray-700 text-xs font-bold px-2 py-1 rounded-md"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md"
              onClick={handleSubmitChanges}
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div
          className={`flex flex-row gap-2 items-start relative hover:bg-gray-50 rounded-md p-2`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Avatar color="blue" size="sm" rounded></Avatar>
          <div className={`grid place-items-start mr-12`}>
            <h1 className="text-sm font-semibold my-1 text-black">
              {fromSelf ? "Me" : props.receiver.name}
            </h1>
            {props.content.length > 0 && (
              <p
                className={`whitespace-wrap text-md rounded-md p-2 mb-2 ${
                  fromSelf
                    ? "bg-regular-fade text-custom-blue"
                    : "text-custom-white bg-custom-blue"
                }`}
              >
                {props.content}
              </p>
            )}
            {props.files.length > 0 && (
              <FilesDisplay fromSelf={fromSelf} files={props.files} />
            )}
            <p className="text-xs my-1 font-bold text-custom-gray">
              {format(props.createdAt)}
            </p>
          </div>
          {fromSelf && isHovered && (
            <span
              className="absolute top-2 right-2"
              role="button"
              onClick={handleMoreClick}
            >
              <FiMoreHorizontal size={20} />
            </span>
          )}
          {showActionsModal && (
            <MessageActions
              modalRef={modalRef}
              handleDeleteMessage={handleDeleteMessage}
              handleEditMessage={toggleEditMode}
            />
          )}
        </div>
      )}
    </>
  );
}
