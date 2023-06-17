import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { FiMoreVertical } from "react-icons/fi";
import { TaskProp } from "../../types";
import { ToggleSwitch } from "flowbite-react";
import { useUpdateTaskStatusMutation } from "../../features/api/taskApi";

export default function Task(props: TaskProp) {
  const [completed, setCompleted] = useState(props.status === "completed");
  const [updateTaskStatus, { isLoading }] = useUpdateTaskStatusMutation();

  useEffect(() => {
    setCompleted(props.status === "completed");
  }, [props.status]);

  return (
    <div className="border p-2 rounded-md cursor-pointer shadow-md bg-white hover:bg-gray-100 mb-3 relative">
      <FiMoreVertical role="button" className="absolute right-2 top-3" size={15} onClick={() => console.log(props._id)} />
      <h1 className="font-bold text-sm">{props.title}</h1>
      <p className="text-sm my-1">{props.description}</p>
      <p className="text-sm">
        Assigned to:{" "}
        <span className="font-semibold">{props.assignee.name}</span>
      </p>

      <ToggleSwitch
        className="my-1"
        color="green"
        checked={completed}
        label={completed ? "Completed ️✅" : "Pending"}
        onChange={async function (checked) {
          setCompleted((prev) => !prev);
          if (checked) {
            const payload = await updateTaskStatus({
              taskId: props._id,
              status: "completed",
            }).unwrap();
          } else {
            const payload = await updateTaskStatus({
              taskId: props._id,
              status: "pending",
            }).unwrap();
          }
        }}
      />
      {!completed && <p>To submit: {props.completion_date}</p>}
    </div>
  );
}
