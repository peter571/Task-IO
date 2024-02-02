import { useRef } from "react";
import { STATE } from "@/constants";
import { MemberProp } from "@/types";
import Loader from "components/Loader/Loader";
import { Modal } from "flowbite-react";
import { useGetWorkSpaceMembersQuery } from "features/api/workspaceApi";
import { useAccountContext } from "context/AccountContext";
import { useNewTaskMutation } from "features/api/taskApi";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";

export default function TaskForm({
  show,
  setShowTaskModal,
}: {
  show: boolean | undefined;
  setShowTaskModal: React.Dispatch<React.SetStateAction<undefined | boolean>>;
}) {
  const { spaceId } = useWorkSpaceContext();
  const { user } = useAccountContext();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const assigneeRef = useRef<HTMLSelectElement | null>(null);
  const { data: spaceMembers = [] } = useGetWorkSpaceMembersQuery(spaceId);
  const [createNewTask] = useNewTaskMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const payload = await createNewTask({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        status: STATE.PENDING,
        completion_date: dateRef.current?.value,
        assignee: assigneeRef.current?.value,
        workspace_id: spaceId,
      }).unwrap();
      setShowTaskModal(undefined);
    } catch (error) {}
  }

  return (
    <Modal
      show={show}
      onClose={() => {
        setShowTaskModal(undefined);
      }}
    >
      <Modal.Header>
        <span className="text-custom-blue">New task</span>
      </Modal.Header>
      <Modal.Body>
        <form className="mt-2 flex flex-col" onSubmit={handleSubmit}>
          <label className="text-custom-blue" htmlFor="members">Select assignee:</label>
          <select
            ref={assigneeRef}
            className="cursor-pointer form__input"
            name="members"
            id="members"
            required
          >
            <option className="font-semibold" value="">
              Select
            </option>
            {spaceMembers.map((member: MemberProp, idx: number) => {
              if (member._id !== user.userId)
                return (
                  <option
                    key={idx}
                    className="font-semibold"
                    value={member._id}
                  >
                    {member.name}
                  </option>
                );
            })}
          </select>
          <input
            name="title"
            ref={titleRef}
            className="form__input"
            placeholder="Task title"
            type="text"
            required
          />
          <textarea
            name="description"
            ref={descriptionRef}
            className="form__input"
            placeholder="Task description..."
            id="description"
            cols={30}
            rows={5}
            required
          ></textarea>
          <input
            name="completionDate"
            ref={dateRef}
            className="form__input"
            type="date"
            required
          />
          <button type="submit" className="btn mt-4" disabled={false}>
            {false ? <Loader /> : "Assign task!"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
