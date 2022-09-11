import React from "react";
import { TaskModalProp } from "../../types";
import Task from "./Task";
import { someTasks } from "./Tasks";
import { Status } from "../../constants";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

export default function TaskUpdate(props: TaskModalProp) {
  const task = someTasks.find((el) => el.id === props.taskId)!;

  function markComplete() {
    task.status = Status.COMPLETED;
  }

  return (
    <ModalWrapper
      modalName={"Task"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
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
    </ModalWrapper>
  );
}
