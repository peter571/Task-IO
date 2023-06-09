import { TasksList } from "./TasksList";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MODALS, TASKS } from "../../constants";
import { ModalContext } from "../../context/ModalContext";
import { useAppDispatch } from "../../hooks/hook";
import { SpacePropRender } from "../../types";
import TaskForm from "./TaskForm";
import TaskModal from "./TaskUpdate";
import { useAccountContext } from "../../context/AccountContext";

export default function Tasks() {
  const [currentId, setCurrentId] = useState(TASKS[0].id);
  const [currentTaskModal, setCurrentTaskModal] = useState("");
  const { openModal, closeModal, taskFormIsOpen, taskModalIsOpen } =
    useContext(ModalContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  const { user } = useAccountContext();
  const { spaceId } = useParams();
  const [currentSpace, setCurrentSpace] = useState<SpacePropRender>(
    {} as SpacePropRender
  );


  useEffect(() => {
    const onload = async () => {
     
    };
    onload();
  }, []);

  const userIsCreator = true;

  return (
    <div className="w-1/5 h-full p-3 ">
      {userIsCreator && (
        <button onClick={() => openModal(MODALS.taskform)} className="btn">
          Assign Task +
        </button>
      )}
      <div className="flex justify-between my-3">
        {TASKS.map((task) => (
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

      <TasksList
        selectedUserTasks={[]}
        currentId={currentId}
        selectedUserId={''}
        setCurrentTaskModal={setCurrentTaskModal}
      />

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
