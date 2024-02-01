import React, { useState } from "react";
import TaskForm from "components/Modals/TaskForm";
import TasksList from "components/TasksTab/TasksList";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";

export default function TasksTab() {
  const { userIsAdmin } = useWorkSpaceContext();
  const [showTaskModal, setShowTaskModal] = useState<undefined | boolean>(
    undefined
  );

  return (
    <div className="w-1/5 h-screen p-3 bg-[#EAF1FB] flex flex-col">
      {userIsAdmin && (
        <button
          onClick={() => setShowTaskModal(true)}
          className="btn basis-1/8"
        >
          Assign new task +
        </button>
      )}
      <div className="h-full overflow-y-auto no-scrollbar">
        <TasksList />
      </div>

      <TaskForm show={showTaskModal} setShowTaskModal={setShowTaskModal} />
    </div>
  );
}
