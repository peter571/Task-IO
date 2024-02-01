import React from "react";
import { useGetUserTasksQuery } from "features/api/taskApi";
import { useAccountContext } from "context/AccountContext";
import { TaskProp } from "@/types";
import Task from "components/TasksTab/Task";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";

export default function UserTasks() {
  const { user } = useAccountContext();
  const { spaceId } = useWorkSpaceContext();

  const {
    data: tasks = [],
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
