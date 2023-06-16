import React from "react";

interface UserAvatarProp {
    selectedUser: any
}

export function UserAvatar({ selectedUser }: UserAvatarProp) {
  return (
    <div className="border-b-2 mb-2 bg-gray-200 p-3">
      {selectedUser && (
        <>
          <img
            className="h-6 w-6 my-1 rounded-[50%]"
            src={selectedUser.avatar}
            alt={selectedUser.name}
            loading="lazy"
          />
          <h1 className="font-extrabold text-md">{selectedUser.name}</h1>
        </>
      )}
    </div>
  );
}
