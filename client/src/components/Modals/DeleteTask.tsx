import { Button, Modal } from "flowbite-react";
import React, { SetStateAction } from "react";
import { useDeleteTaskMutation } from "features/api/taskApi";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";

export default function DeleteTask({
  show,
  setShowDeleteTaskModal,
}: {
  show: boolean | undefined;
  setShowDeleteTaskModal: React.Dispatch<SetStateAction<boolean | undefined>>;
}) {
  const { selectedTaskId } = useWorkSpaceContext();
  const [deleteTask] = useDeleteTaskMutation();

  return (
    <Modal
      show={show}
      onClose={() => setShowDeleteTaskModal(undefined)}
      size="md"
    >
      <Modal.Header>Are you sure you want to delete this task?</Modal.Header>
      <Modal.Body className="flex flex-row gap-4 items-center">
        <Button
          color="failure"
          type="button"
          onClick={async () => {
            try {
              if (selectedTaskId) {
                await deleteTask(selectedTaskId).unwrap();
              }
              setShowDeleteTaskModal(undefined);
            } catch (error) {}
          }}
        >
          Delete
        </Button>
        <Button
          color="gray"
          type="button"
          onClick={() => setShowDeleteTaskModal(undefined)}
        >
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
}
