import React, { MouseEventHandler } from "react";

export interface ChatProp {
  profileImage: string;
  userName: string;
  previewText: string;
}

export interface SpaceProp {
  spaceImage: string;
  spaceName: string;
  spaceId: string;
}

export interface TaskModalProp {
  id?: string;
  taskId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface NewSpaceProp extends TaskModalProp {}

export interface JoinSpaceProp extends TaskModalProp {}

export interface TaskProp {
  id?: string;
  title: string;
  description: string;
  status: string;
  dateline: string;
  openModal?: MouseEventHandler<HTMLDivElement>;
}

export interface ModalWrapperProp extends TaskModalProp {
  children: React.ReactNode;
  modalName?: string;
}

export interface UserContextProp {
  children: React.ReactNode;
}

export interface GlobalUser {
  currentUser: string | null;
}

export interface ModalProviderProp {
  children: React.ReactNode;
}

export interface GlobalModalProp {
  closeModal: (id: string) => void;
  openModal: (id: string) => void;
  taskFormIsOpen: boolean;
  taskModalIsOpen: boolean;
  newSpaceModal: boolean;
  joinSpaceModal: boolean;
}
