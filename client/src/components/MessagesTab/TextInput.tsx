import React, { useEffect, useRef, useState } from "react";
import { Button } from "flowbite-react";
import { useAccountContext } from "context/AccountContext";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";
import { useNewMessageMutation } from "features/api/messageApi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdCancel, MdOutlineEmojiEmotions } from "react-icons/md";
import { FcDocument } from "react-icons/fc";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { uploadFileToStorage } from "firebaseapp/storage_upload";
import { FileType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import socket from "socket/socket";

export function TextInput() {
  const { user } = useAccountContext();
  const [textMsg, setTextMsg] = useState("");
  const { selectedChat, selectedUser, spaceId } = useWorkSpaceContext();
  const [sendMessage, { isLoading }] = useNewMessageMutation();
  const [previews, setPreviews] = useState<any[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  const onEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
    setTextMsg(textAreaRef.current?.value + emoji.emoji);
  };

  const handleFileChange = (e: React.ChangeEvent<any>) => {
    const files = e.target.files;
    console.log(files);
    const filePreviews: {
      file_url: string | ArrayBuffer | null | undefined;
      name: string;
      type: string;
    }[] = [...previews];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = event.target?.result;
        filePreviews.push({
          file_url: preview,
          name: file.name,
          type: file.type,
        });
        setPreviews(filePreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePreview = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      /**Upload files to file storage and get back the urls */
      setUploadingFiles(true);
      const fileUrls = await Promise.all(
        previews.map(async (file: FileType) => {
          try {
            const url = await uploadFileToStorage(
              file.file_url,
              uuidv4() + file.name
            );
            return { ...file, file_url: url };
          } catch (error) {
            // Handle the error if needed
            console.error(error);
            return file; // Return the file without modifying the URL
          }
        })
      );
      setUploadingFiles(false);
      
      const payload = await sendMessage({
        content: textMsg,
        receiver: selectedUser,
        sender: user.userId,
        workspace_id: spaceId,
        chat_id: selectedChat,
        files: fileUrls,
      }).unwrap();
      
       /**Emit message to socket */
       socket.emit("private message", payload);

      setTextMsg("");
      setPreviews([]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<any>) {
    setTextMsg(e.target.value);
  }

  const isVideo = (type: string) => type.startsWith("video");
  const isDocument = (type: string) =>
    type.startsWith("application") || type.startsWith("text");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <section
      ref={pickerRef}
      className="w-full flex flex-col gap-2 relative p-2 bg-slate-200"
    >
      <div
        id="previews"
        className={`${
          previews.length === 0 && "hidden"
        } flex flex-wrap gap-2 p-3 bg-slate-200`}
      >
        {previews.map((preview, index) => (
          <div key={index} className="relative w-16 h-20">
            {typeof preview.file_url === "string" &&
            preview.file_url.startsWith("data:image") ? (
              <img
                src={preview.file_url}
                alt="File Preview"
                className="w-16 h-16 object-cover opacity-50"
              />
            ) : isVideo(preview.type) ? (
              <video
                src={preview.file_url}
                className="w-16 h-16 object-cover rounded-sm"
                controls
              />
            ) : isDocument(preview.type) ? (
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                <FcDocument size={40} />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-sm font-bold">Unknown</p>
              </div>
            )}
            <p className="text-xs truncate font-bold">{preview.name}</p>
            <span
              role="button"
              className="absolute top-0 right-0 p-1 rounded-full text-white"
              onClick={() => handleRemovePreview(index)}
            >
              <MdCancel color="black" />
            </span>
          </div>
        ))}
      </div>

      <form
        className="w-full flex flex-row gap-2 justify-between"
        onSubmit={handleSubmit}
      >
        <label htmlFor="files" className="px-2" role="button">
          <AiOutlinePlus size={25} />
        </label>
        <input
          onChange={handleFileChange}
          className="hidden"
          name="files"
          id="files"
          type="file"
          multiple
        />
        <textarea
          ref={textAreaRef}
          className="msg_input rounded basis-3/4"
          name="message"
          placeholder="Type message..."
          onChange={handleChange}
          id="msg"
          rows={3}
          value={textMsg}
          style={{ height: "auto" }}
        ></textarea>

        <div className="basis-1/4 flex flex-row justify-center gap-2">
          <span role="button" onClick={() => setShowPicker((prev) => !prev)}>
            <MdOutlineEmojiEmotions size={25} />
          </span>
          <Button
            color="success"
            className="w-full"
            type="submit"
            disabled={
              (textMsg.length === 0 && previews.length === 0) ||
              isLoading ||
              uploadingFiles
            }
          >
            Send
          </Button>
        </div>
      </form>
      {showPicker && (
        <div className="absolute bottom-28 right-0">
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </section>
  );
}
