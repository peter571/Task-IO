import { createContext, useState } from "react";
import { MODALS } from "../constants";
import { GlobalModalProp, ModalProviderProp } from "../types";

export const ModalContext = createContext({} as GlobalModalProp);

export const ModalProvider = ({ children }: ModalProviderProp) => {
  const [taskFormIsOpen, setTaskFormIsOpen] = useState(false);
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
  const [newSpaceModal, setNewSpaceModalIsOpen] = useState(false);

  const closeModal = (id: string) => {
    if (MODALS.taskModal === id) {
      setTaskModalIsOpen(false);
    } else if (MODALS.taskform === id) {
      setTaskFormIsOpen(false);
    } else if (MODALS.newSpaceModal === id) {
      setNewSpaceModalIsOpen(false);
    }
  };

  const openModal = (id: string) => {
    if (MODALS.taskModal === id) {
      setTaskModalIsOpen(true);
    } else if (MODALS.taskform === id) {
      setTaskFormIsOpen(true);
    } else if (MODALS.newSpaceModal === id) {
      setNewSpaceModalIsOpen(true);
    }
  };
  return (
    <ModalContext.Provider
      value={{
        closeModal,
        openModal,
        taskFormIsOpen,
        taskModalIsOpen,
        newSpaceModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
