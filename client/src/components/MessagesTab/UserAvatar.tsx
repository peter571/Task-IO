import { Avatar } from "flowbite-react";
import React from "react";

interface UserAvatarProp {
  selectedUser: any;
}

export function UserAvatar() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("inbox");
  const name = !userName
    ? ""
    : userName.replace(/-/g, " ").replace(/(?:^|\s)\S/g, function (match) {
        return match.toUpperCase();
      });

  return (
    <div className="border-b-2 mb-2 bg-gray-200 p-3 flex flex-row items-center gap-2">
      <Avatar size="sm" />
      <h1 className="font-extrabold text-md">{name}</h1>
    </div>
  );
}
