import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { FiMoreVertical } from "react-icons/fi";
import { TaskProp } from "../../types";
import { ToggleSwitch } from "flowbite-react";
import {
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
} from "../../features/api/taskApi";
import DeleteTask from "../Modals/DeleteTask";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";

interface EditTaskFormData {
  title: string;
  description: string;
  completion_date: string;
}

export default function Task(props: TaskProp) {
  const [completed, setCompleted] = useState(props.status === "completed");
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskData, setTaskData] = useState<EditTaskFormData>({
    title: props.title,
    description: props.description,
    completion_date: props.completion_date,
  });
  const [updateTask, { isLoading: updatingTask }] = useUpdateTaskMutation();
  const formRef = useRef<HTMLFormElement>(null);
  const [updateTaskStatus, { isLoading: updatingTaskStatus }] =
    useUpdateTaskStatusMutation();
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState<
    boolean | undefined
  >(undefined);
  const { setSelectedTask, userIsAdmin } = useWorkSpaceContext();

  useEffect(() => {
    setCompleted(props.status === "completed");
  }, [props.status]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsEditMode(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (userIsAdmin) {
      event.stopPropagation();
      setIsEditMode(true);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const payload = await updateTask({
        ...taskData,
        task_id: props._id,
      }).unwrap();
    } catch (error) {
    } finally {
      setIsEditMode(false);
    }
  };

  useEffect(() => {
    setTaskData({
      title: props.title,
      description: props.description,
      completion_date: props.completion_date,
    });
  }, [props]);

  return (
    <div className="border-0 p-2 rounded-xl shadow-md w mb-3 relative bg-fade-blue hover:bg-regular-fade">
      {!isEditMode && (
        <span className="hover:bg-gray-500 rounded-full absolute right-2 top-2 p-1">
          <FiMoreVertical
            role="button"
            size={15}
            onClick={() => {
              setSelectedTask(props._id);
              setShowDeleteTaskModal(true);
            }}
            color="white"
          />
        </span>
      )}
      <div key={props._id} className="cursor-pointer p-2" onClick={handleClick}>
        {isEditMode ? (
          <form className="flex flex-col" ref={formRef} onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              className="form__input"
              value={taskData.title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              className="form__input"
              value={taskData.description}
              rows={5}
              onChange={handleChange}
            />
            <input
              name="completion_date"
              value={taskData.completion_date}
              className="form__input"
              type="date"
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn mt-4" disabled={updatingTask}>
              Save
            </button>
          </form>
        ) : (
          <>
            <h1 className="font-bold text-sm text-custom-blue">{props.title}</h1>
            <p className="text-sm my-1 text-custom-blue">{props.description}</p>
            {userIsAdmin && (
              <p className="text-sm text-custom-blue">
                Assigned to:{" "}
                <span className="font-semibold">{props.assignee.name}</span>
              </p>
            )}
            {!completed && <p className="text-custom-blue">To submit: {props.completion_date}</p>}
          </>
        )}
      </div>
      {!isEditMode && (
        <ToggleSwitch
          disabled={updatingTaskStatus}
          className="my-1"
          color="purple"
          checked={completed}
          label={completed ? "Completed ️✅" : "Pending"}
          onChange={async function (checked) {
            setCompleted((prev) => !prev);
            if (checked) {
              const payload = await updateTaskStatus({
                taskId: props._id,
                status: "completed",
              }).unwrap();
            } else {
              const payload = await updateTaskStatus({
                taskId: props._id,
                status: "pending",
              }).unwrap();
            }
          }}
        />
      )}
      <DeleteTask
        show={showDeleteTaskModal}
        setShowDeleteTaskModal={setShowDeleteTaskModal}
      />
    </div>
  );
}
