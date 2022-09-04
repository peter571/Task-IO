import React from "react";
import pic from "../../assets/somepic.png";
import Space from "./Space";

export default function Spaces() {
  return (
    <div className="flex align-middle items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-full sm:w-[70%] md:w-[50%] lg:w-[30%]">
        {someData.map((space) => (
          <Space key={space.spaceId} {...space} />
        ))}
      </div>
    </div>
  );
}

const someData = [
  { spaceImage: pic, spaceName: "RN GROUP", spaceId: "RN001" },
  { spaceImage: pic, spaceName: "Koecha Tech and CTO", spaceId: "KOECHA000091" },
];
