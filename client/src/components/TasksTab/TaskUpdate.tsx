import React, { useEffect, useState } from "react";
import { TaskModalProp } from "../../types";
import Task from "./Task";
import { STATE, Status } from "../../constants";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";

import Loader from "../Loader/Loader";

export default function TaskUpdate(props: TaskModalProp) {
  const dispatch = useAppDispatch();

  const [isloading, setIsLoading] = useState(STATE.IDLE);
  const pending = isloading === STATE.PENDING;

  async function markComplete() {
    try {
      
    } catch (error) {
      setIsLoading(STATE.FAILED);
    }
  }

  return (
    <ModalWrapper
      modalName={"Task"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      {/* <div className="my-2">
        {selectedTask && <Task {...selectedTask} />}
      </div>
      {selectedTask?.status === Status.PENDING && (
        <button className="btn w-full" onClick={markComplete} disabled={pending}>
          {pending ? <Loader /> : "Mark as Complete"}
        </button>
      )} */}
    </ModalWrapper>
  );
}
