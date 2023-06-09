import React, { useContext } from "react";
import { MODALS, TASKS } from "../../constants";
import { ModalContext } from "../../context/ModalContext";
import Task from "./Task";

interface TasksListProp {
  selectedUserTasks: Array<any>;
  currentId: string;
  selectedUserId: string | null;
  setCurrentTaskModal: React.Dispatch<React.SetStateAction<string>>;
}

export function TasksList({
  selectedUserTasks,
  currentId,
  selectedUserId,
  setCurrentTaskModal,
}: TasksListProp) {
  const { openModal } = useContext(ModalContext);

  function onTaskClick(task: any) {
    setCurrentTaskModal(task._id);
    openModal(MODALS.taskModal);
  }

  return (
    <div className="flex flex-col gap-4 overflow-auto h-[80%]">
      {selectedUserTasks.length === 0
        ? selectedUserId && <p>No tasks assigned</p>
        : selectedUserTasks.map((task) => {
            if (currentId === TASKS[0].id) {
              return (
                <Task
                  openUpdateModal={() => {
                    onTaskClick(task);
                  }}
                  key={task._id}
                  {...task}
                />
              );
            } else if (
              currentId === TASKS[1].id &&
              TASKS[1].id === task.status
            ) {
              return (
                <Task
                  openUpdateModal={() => {
                    onTaskClick(task);
                  }}
                  key={task._id}
                  {...task}
                />
              );
            } else if (
              currentId === TASKS[2].id &&
              TASKS[2].id === task.status
            ) {
              return (
                <Task
                  openUpdateModal={() => {
                    onTaskClick(task);
                  }}
                  key={task._id}
                  {...task}
                />
              );
            }
          })}
    </div>
  );
}
