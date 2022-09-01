import React, { useState } from "react";
import Task from "./Task";

const tasks = [
  { id: "all", title: "All" },
  { id: "pending", title: "Pending" },
  { id: "completed", title: "Completed" },
];

export default function Tasks() {

  const [currentId, setCurrentId] = useState('all')

  return (
    <div className="basis-1/4">
      <button className="p-2 text-white bg-slate-700 rounded-md hover:bg-slate-400">
        Assign Task +
      </button>

      <div className="flex justify-between my-3">
        {tasks.map((task) => (
          <button
            className={`px-2 py-1 ${currentId === task.id ? 'text-white bg-slate-700' : ''} text-sm rounded-md`}
            key={task.id}
            onClick={() => setCurrentId(task.id)}
          >
            {task.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Task
          title={"UI development"}
          description={"Write some react code"}
          status={"pending"}
          dateline={"11/04/2022"}
        />
        <Task
          title={"Node development"}
          description={"Create some services on Node JS"}
          status={"completed"}
          dateline={"11/04/2022"}
        />
        <Task
          title={"Database scripts"}
          description={
            "Write some scripts to insert and read some info in database"
          }
          status={"pending"}
          dateline={"11/04/2022"}
        />
      </div>
    </div>
  );
}
