import React, { useEffect, useState } from "react";
import {
  useGetWorkSpaceTasksQuery,
  useLazyGetWorkSpaceTasksQuery,
} from "../../features/api/taskApi";
import { useParams } from "react-router-dom";
import Task from "./Task";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";

export type STATUS = "all-tasks" | "completed" | "pending";

export default function AllTasks({
  status_type,
}: {
  status_type: STATUS | string;
}) {
  const { spaceId } = useWorkSpaceContext();
  const [fetchTasks, { isSuccess }] = useLazyGetWorkSpaceTasksQuery();
  const { data: tasks = [] } = useGetWorkSpaceTasksQuery({
    workspace_id: spaceId,
    status_type,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const payload = await fetchTasks({
          workspace_id: spaceId,
          status_type,
        }).unwrap();
      } catch (error) {}
    }

    fetchData();
  }, [status_type]);

  return (
    <div className="py-2 h-[600px] overflow-y-auto">
      {isSuccess &&
        tasks.map((task: any, idx: number) => <Task key={idx} {...task} />)}
    </div>
  );
}
