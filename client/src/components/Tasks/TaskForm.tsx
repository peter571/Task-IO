import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { MdClose } from "react-icons/md";
import { Status } from "../../constants";
import { TaskModalProp, TaskProp } from "../../types";

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
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="dialog__panel">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Assign new task
                </Dialog.Title>
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
                <MdClose
                  onClick={props.onClose}
                  className="absolute cursor-pointer top-2 right-4 text-blue-900"
                  size={25}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
