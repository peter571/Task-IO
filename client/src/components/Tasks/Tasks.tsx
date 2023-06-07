import { TasksList } from "./TasksList";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MODALS, TASKS } from "../../constants";
import { ModalContext } from "../../context/ModalContext";
import {
  getSpaceMembersBySpaceId,
  getUserSpacesByUserId,
} from "../../features/spaces/spaceSlice";
import {
  taskSelector,
  getTasksByUserId,
  selectTask,
} from "../../features/tasks/taskSlice";
import { userSelector } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { SpacePropRender } from "../../types";
import TaskForm from "./TaskForm";
import TaskModal from "./TaskUpdate";

export default function Tasks() {
  const [currentId, setCurrentId] = useState(TASKS[0].id);
  const [currentTaskModal, setCurrentTaskModal] = useState("");
  const { openModal, closeModal, taskFormIsOpen, taskModalIsOpen } =
    useContext(ModalContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedUserTasks } = useAppSelector(taskSelector);
  const { selectedUserId } = useAppSelector(userSelector);
  const { user } = useAppSelector(userSelector);
  const { spaceId } = useParams();
  const [currentSpace, setCurrentSpace] = useState<SpacePropRender>(
    {} as SpacePropRender
  );

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getTasksByUserId(selectedUserId));
    }
  }, [selectedUserId]);

  useEffect(() => {
    const onload = async () => {
      if (user && spaceId) {
        const spaces = await dispatch(
          getUserSpacesByUserId(user.userId)
        ).unwrap();
        await dispatch(getSpaceMembersBySpaceId(spaceId)).unwrap();
        setCurrentSpace(spaces.find((space: any) => space._id === spaceId));
      } else {
        navigate("/spaces");
      }
    };
    onload();
  }, []);

  const userIsCreator = user?.userId == currentSpace.creator;

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
        selectedUserTasks={selectedUserTasks}
        currentId={currentId}
        selectedUserId={selectedUserId}
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
