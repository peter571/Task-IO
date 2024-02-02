import { Button, Modal } from "flowbite-react";
import React, { SetStateAction } from "react";
import { useWorkSpaceContext } from "components/WorkSpace/WorkSpace";
import { useDeleteNoteMutation } from "features/api/noteApi";

export default function DeleteNote({
  show,
  setShowDeleteNoteModal,
}: {
  show: boolean | undefined;
  setShowDeleteNoteModal: React.Dispatch<SetStateAction<boolean | undefined>>;
}) {
  const { selectedNoteId } = useWorkSpaceContext();
  const [deleteNote] = useDeleteNoteMutation();

  return (
    <Modal
      show={show}
      onClose={() => setShowDeleteNoteModal(undefined)}
      size="md"
    >
      <Modal.Header>Are you sure you want to delete this note?</Modal.Header>
      <Modal.Body className="flex flex-row gap-4 items-center">
        <Button
          color="failure"
          type="button"
          onClick={async () => {
            try {
              if (selectedNoteId) {
                await deleteNote(selectedNoteId).unwrap();
              }
              setShowDeleteNoteModal(undefined);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Delete
        </Button>
        <Button
          color="gray"
          type="button"
          onClick={() => setShowDeleteNoteModal(undefined)}
        >
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
}
