import React, { useEffect, useState } from "react";
import { useLazyGetWorkSpaceTasksQuery } from "../../features/api/taskApi";
import Task from "./Task";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";
import Loader from "../Loader/Loader";

export type STATUS = "all-tasks" | "completed" | "pending";

export default function AllTasks({
  status_type,
}: {
  status_type: STATUS | string;
}) {
  const { spaceId } = useWorkSpaceContext();
  const [tasks, setTasks] = useState<any[]>([]);
  const [fetchTasks, { isLoading }] =
    useLazyGetWorkSpaceTasksQuery();

  useEffect(() => {
    async function fetchData() {
      try {
        const tasksPayload = await fetchTasks({
          workspace_id: spaceId,
          status_type,
        }).unwrap();
        setTasks(tasksPayload);
      } catch (error) {}
    }

    fetchData();
  }, [status_type]);

  return (
    <div className="py-2 h-[600px] overflow-y-auto">
      {isLoading && <Loader />}
      {!isLoading &&
        tasks.length > 0 &&
        tasks.map((task: any, idx: number) => <Task key={idx} {...task} />)}
    </div>
  );
}
