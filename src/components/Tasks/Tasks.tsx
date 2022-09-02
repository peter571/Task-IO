import React, { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskModal from "./TaskModal";

const tasks = [
  { id: "all", title: "All" },
  { id: "pending", title: "Pending" },
  { id: "completed", title: "Completed" },
];

const MODALS = {
  taskform: "task-form",
  taskModal: "task-modal",
};

export default function Tasks() {
  const [currentId, setCurrentId] = useState(tasks[0].id);
  const [taskFormIsOpen, setTaskFormIsOpen] = useState(false);
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
  const [currentTaskModal, setCurrentTaskModal] = useState('')

  function closeModal(id: string) {
    if (MODALS.taskModal === id) {
      setTaskModalIsOpen(false);
    } else {
      setTaskFormIsOpen(false);
    }
  }

  function openModal(id: string) {
    if (MODALS.taskModal === id) {
      setTaskModalIsOpen(true);
    } else {
      setTaskFormIsOpen(true);
    }
  }

  return (
    <div className="basis-1/4">
      <button onClick={() => openModal(MODALS.taskform)} className="btn">
        Assign Task +
      </button>

      <div className="flex justify-between my-3">
        {tasks.map((task) => (
          <button
            className={`px-2 py-1 ${
              currentId === task.id ? "text-white bg-slate-700" : ""
            } text-sm rounded-md`}
            key={task.id}
            onClick={() => setCurrentId(task.id)}
          >
            {task.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {someTasks.map((task) => {
          if (currentId === tasks[0].id) {
            return (
              <Task
                openModal={() => {
                  setCurrentTaskModal(task.id);
                  openModal(MODALS.taskModal);
                }}
                key={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                dateline={task.dateline}
              />
            );
          } else if (currentId === tasks[1].id && tasks[1].id === task.status) {
            return (
              <Task
                openModal={() => {
                  setCurrentTaskModal(task.id);
                  openModal(MODALS.taskModal);
                }}
                key={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                dateline={task.dateline}
              />
            );
          } else if (currentId === tasks[2].id && tasks[2].id === task.status) {
            return (
              <Task
                openModal={() => {
                  setCurrentTaskModal(task.id);
                  openModal(MODALS.taskModal);
                }}
                key={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                dateline={task.dateline}
              />
            );
          }
        })}
      </div>

      <TaskForm
        isOpen={taskFormIsOpen}
        onClose={() => closeModal(MODALS.taskform)}
        id={MODALS.taskform}
      />
      <TaskModal
        isOpen={taskModalIsOpen}
        onClose={() => closeModal(MODALS.taskModal)}
        id={MODALS.taskModal}
        taskId={currentTaskModal}
      />
    </div>
  );
}

export const someTasks = [
  {
    id: '001',
    title: "UI",
    description: "Develop the design",
    status: 'pending',
    dateline: "11/04/2022",
  },
  {
    id: '002',
    title: "React app",
    description: "Develop the react components",
    status: 'completed',
    dateline: "11/04/2022",
  },
  {
    id: '003',
    title: "Node JS Server",
    description: "Develop the server side services",
    status: 'pending',
    dateline: "11/04/2022",
  },
  {
    id: '004',
    title: "Mongo DB database",
    description: "Develop the database queries",
    status: 'completed',
    dateline: "11/04/2022",
  }
]
