import React from "react";
import pic from "../../assets/somepic.png";
import CreateSpace from "./CreateSpace";
import Space from "./Space";

export default function Spaces() {
  if (someData.length > 0) return <CreateSpace />;

  return (
    <div className="screen-wrapper">
      <div className="div-container">
        {someData.map((space) => (
          <Space key={space.spaceId} {...space} />
        ))}
      </div>
    </div>
  );
}

const someData = [
  { spaceImage: pic, spaceName: "RN GROUP", spaceId: "RN001" },
  {
    spaceImage: pic,
    spaceName: "Koecha Tech and CTO",
    spaceId: "KOECHA000091",
  },
];
