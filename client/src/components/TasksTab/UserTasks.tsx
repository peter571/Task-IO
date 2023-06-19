import React from "react";
import { useGetUserTasksQuery } from "../../features/api/taskApi";
import { useAccountContext } from "../../context/AccountContext";
import { useParams } from "react-router-dom";
import { TaskProp } from "../../types";
import Task from "./Task";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";

export default function UserTasks() {
  const { user } = useAccountContext();
  const { spaceId } = useWorkSpaceContext();

  const {
    data: tasks = [],
    isLoading,
    isSuccess,
  } = useGetUserTasksQuery({ workspace_id: spaceId, userId: user.userId });
  return (
    <div className="py-2 h-[600px] overflow-y-auto">
      {isSuccess &&
        tasks.map((task: TaskProp, idx: number) => (
          <Task key={idx} {...task} />
        ))}
    </div>
  );
}
