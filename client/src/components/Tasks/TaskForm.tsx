import { useState } from "react";
import { STATE, Status } from "../../constants";
import { saveNewTask } from "../../features/tasks/taskSlice";
import { userSelector } from "../../features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { TaskModalProp, TaskProp } from "../../types";
import Loader from "../Loader/Loader";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

export default function TaskForm(props: TaskModalProp) {
  const initialValues = {
    title: "",
    description: "",
    completionDate: "",
    status: Status.PENDING,
    assignee: "",
    adminId: "",
  };
  const [taskData, setTaskData] = useState<TaskProp>(initialValues);
  const dispatch = useAppDispatch();
  const { user, selectedUserId } = useAppSelector(userSelector);
  const [isloading, setIsLoading] = useState(STATE.IDLE);
  const pending = isloading === STATE.PENDING;

  function handleChange(e: React.ChangeEvent<any>) {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (user && selectedUserId) {
        const task = {
          ...taskData,
          assignee: selectedUserId,
          adminId: user.userId,
        };
        setIsLoading(STATE.PENDING);
        const savedTask = await dispatch(saveNewTask(task)).unwrap();
        setIsLoading(STATE.SUCCESS)
        setTaskData(initialValues);
      }
    } catch (error) {
      setIsLoading(STATE.FAILED);
    }
  }

  return (
    <ModalWrapper
      modalName={"Assign new task"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <form className="mt-2 flex flex-col" onSubmit={handleSubmit}>
        <input
          name="title"
          value={taskData.title}
          onChange={handleChange}
          className="form__input"
          placeholder="Task title"
          type="text"
          required
        />
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          className="form__input"
          placeholder="Task description..."
          id="description"
          cols={30}
          rows={5}
          required
        ></textarea>
        <input
          name="completionDate"
          value={taskData.completionDate}
          onChange={handleChange}
          className="form__input"
          type="date"
          required
        />
        <button type="submit" className="btn mt-4" disabled={pending}>
          {pending ? <Loader /> : 'Create task!'}
        </button>
      </form>
    </ModalWrapper>
  );
}
