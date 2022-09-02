import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { MdClose } from "react-icons/md";
import { TaskModalProp } from "../../types";
import Task from "./Task";
import { someTasks } from "./Tasks";
import { Status } from "../../constants";

export default function TaskModal(props: TaskModalProp) {
  const task = someTasks.find((el) => el.id === props.taskId)!;
  const [count, setCount] = useState(0)

  function markComplete() {
    task.status = "completed";
    setCount(count + 1)
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
                  Task
                </Dialog.Title>
                <div className="my-2">
                  <Task
                    title={task?.title}
                    description={task?.description}
                    status={task?.status}
                    dateline={task?.dateline}
                  />
                </div>
                {task?.status === Status.PENDING && (
                  <button className="btn" onClick={() => markComplete()}>
                    Mark as Complete
                  </button>
                )}

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
