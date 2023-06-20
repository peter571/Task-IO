import React from "react";
import noprofile from "../../assets/noprofile.png";
import { FileType, MessageProp } from "../../types";
import { format } from "timeago.js";
import { Avatar } from "flowbite-react";
import { useAccountContext } from "../../context/AccountContext";
import { FcDocument } from "react-icons/fc";
import { HiDownload } from "react-icons/hi";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { saveAs } from "file-saver";

export default function Message(props: MessageProp) {
  const { user } = useAccountContext();
  const fromSelf = props.sender === user.userId;
  return (
    <div className="flex flex-col">
      <div className={`flex ${fromSelf && "flex-row-reverse"} gap-2`}>
        <Avatar size="sm" rounded />
        {props.content.length > 0 ? (
          <p
            className={`${
              fromSelf ? "bg-gray-200 text-black" : "text-white bg-blue-900"
            } whitespace-normal text-md break-words max-w-[70% rounded-md p-2`}
          >
            {props.content}
          </p>
        ) : (
          <FilesDisplay
            fromSelf={fromSelf}
            files={props.files}
            hastText={props.content.length > 0}
          />
        )}
      </div>
      {props.content.length > 0 && (
        <FilesDisplay
          fromSelf={fromSelf}
          files={props.files}
          hastText={props.content.length > 0}
        />
      )}
      <p
        className={`text-sm ml-11 ${
          fromSelf && "text-right mr-11 float-right"
        }`}
      >
        {format(props.createdAt)}
      </p>
    </div>
  );
}

function FilesDisplay({
  fromSelf,
  files,
  hastText,
}: {
  fromSelf: boolean;
  files: FileType[];
  hastText: boolean;
}) {
  function handleDownload(url: string, fileName: string) {
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = fileName;
    // link.click();
    saveAs(url, fileName);
  }

  return (
    <div
      className={`mt-2 flex flex-row flex-wrap ${
        fromSelf ? "flex-row-reverse" : ""
      } ${hastText ? "mr-6" : "mr-6"}`}
    >
      {files.length > 0 &&
        files.map((file: FileType, idx: number) => {
          if (file.type.startsWith("image")) {
            return (
              <div className="flex flex-col m-2 w-32">
                <img
                  key={idx}
                  src={file.file_url}
                  className="h-32 w-32 object-cover float-right hover:opacity-50"
                />
                <div
                  className="flex flex-row gap-2 items-center py-1 hover:text-green-600"
                  role="button"
                  onClick={() => handleDownload(file.file_url, file.name)}
                >
                  <span>
                    <BiDownload size={20} className="" />
                  </span>
                  <p className="text-sm truncate">{file.name}</p>
                </div>
              </div>
            );
          } else if (file.type.startsWith("video")) {
            return (
              <div className="flex flex-col m-2 w-32">
                <video
                  className="h-32 w-32 object-cover float-right"
                  src={file.file_url}
                  controls
                />
                <div
                  className="flex flex-row gap-2 items-center py-1 hover:text-green-600"
                  role="button"
                  onClick={() => handleDownload(file.file_url, file.name)}
                >
                  <span>
                    <BiDownload size={20} className="" />
                  </span>
                  <p className="text-sm truncate">{file.name}</p>
                </div>
              </div>
            );
          } else if (file.type.startsWith("application")) {
            return (
              <div className="flex flex-col m-2 w-32">
                <div className="h-32 w-32 bg-gray-200 flex items-center justify-center float-right">
                  <FcDocument size={40} />
                </div>
                <div
                  className="flex flex-row gap-2 items-center py-1 hover:text-green-600"
                  role="button"
                  onClick={() => handleDownload(file.file_url, file.name)}
                >
                  <span>
                    <BiDownload size={20} className="" />
                  </span>
                  <p className="text-sm truncate">{file.name}</p>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}
