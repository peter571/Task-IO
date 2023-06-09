import { useState } from "react";
import { STATE, Status } from "../../constants";
import { useAppDispatch } from "../../hooks/hook";
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
 
  const [isloading, setIsLoading] = useState(STATE.IDLE);
  const pending = isloading === STATE.PENDING;

  function handleChange(e: React.ChangeEvent<any>) {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      
      
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
