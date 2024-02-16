import React from "react";
import { useGetUserTasksQuery } from "features/api/taskApi";
import { useAccountContext } from "context/AccountContext";
import { TaskProp } from "@/types";
import Task from "components/TasksTab/Task";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";
import Loader from "components/Loader/Loader";

export default function UserTasks() {
  const { user } = useAccountContext();
  const { spaceId } = useWorkSpaceContext();

  const { data: tasks = [], isLoading } = useGetUserTasksQuery({
    workspace_id: spaceId,
    userId: user.userId
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="py-2 h-[600px] overflow-y-auto">
      {tasks && tasks.length === 0 ? (
        <p className="text-sm">No Tasks</p>
      ) : (
        tasks &&
        tasks.map((task: TaskProp, idx: number) => <Task key={idx} {...task} />)
      )}
    </div>
  );
}
