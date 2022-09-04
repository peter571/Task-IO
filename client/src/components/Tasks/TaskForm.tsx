import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { MdClose } from "react-icons/md";
import { Status } from "../../constants";
import { TaskModalProp, TaskProp } from "../../types";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

export default function TaskForm(props: TaskModalProp) {
  const [taskData, setTaskData] = useState<TaskProp>({
    title: "",
    description: "",
    dateline: "",
    status: Status.PENDING,
  });

  function handleChange(e: React.ChangeEvent<any>) {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(taskData);
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
          name="dateline"
          value={taskData.dateline}
          onChange={handleChange}
          className="form__input"
          type="date"
          required
        />
        <button type="submit" className="btn mt-4">
          Create task!
        </button>
      </form>
    </ModalWrapper>
  );
}
