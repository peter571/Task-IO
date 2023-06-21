import React from "react";
import { BiDownload } from "react-icons/bi";
import { FcDocument } from "react-icons/fc";
import { FileType } from "../../types";
import saveAs from "file-saver";

export default function FilesDisplay({
  fromSelf,
  files,
}: {
  fromSelf: boolean;
  files: FileType[];
}) {
  function handleDownload(url: string, fileName: string) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, fileName);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  }

  return (
    <div
      className={`flex flex-row mt-2 flex-wrap gap-3`}
    >
      {files.length > 0 &&
        files.map((file: FileType, idx: number) => {
          let displayContent;
          if (file.type.startsWith("image")) {
            displayContent = (
              <img
                src={file.file_url}
                className="h-32 w-32 object-cover float-right hover:opacity-50"
              />
            );
          } else if (file.type.startsWith("video")) {
            displayContent = (
              <video
                className="h-32 w-32 object-cover float-right"
                src={file.file_url}
                controls
              />
            );
          } else if (file.type.startsWith("application")) {
            displayContent = (
              <div className="h-32 w-32 bg-gray-200 flex items-center justify-center float-right">
                <FcDocument size={40} />
              </div>
            );
          }

          return (
            <div key={idx} className="flex flex-col w-32">
              {displayContent}
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
        })}
    </div>
  );
}
