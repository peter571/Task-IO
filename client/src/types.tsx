import React, { MouseEventHandler } from "react";

export interface ChatProp extends User {
  avatar: string;
  previewText: string;
}

export interface SpaceProp {
  avatar: string | ArrayBuffer | null;
  title: string;
  members: Array<User>;
  creator: string;
}

export interface SpacePropRender extends SpaceProp {
  _id: string;
  avatar: string;
}

export interface TaskModalProp {
  id?: string;
  taskId?: string;
  isOpen: boolean;
  task?: TaskProp;
  onClose: () => void;
}

export interface NewSpaceProp extends TaskModalProp {}

export interface JoinSpaceProp extends TaskModalProp {}

export interface TaskProp {
  _id?: string
  title: string;
  description: string;
  status: string;
  completionDate: string;
  adminId: string;
  assignee: string;
}

export interface TaskPropRender extends TaskProp {
  _id: string;
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

export interface MessageProp {
  fromSelf: boolean;
  message: string;
  createdAt: string;
  senderAvatar: string| ArrayBuffer | null;
}

export interface GlobalModalProp {
  closeModal: (id: string) => void;
  openModal: (id: string) => void;
  taskFormIsOpen: boolean;
  taskModalIsOpen: boolean;
  newSpaceModal: boolean;
  joinSpaceModal: boolean;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface RegisterValues {
  email: string;
  name: string;
  password: string;
  avatar: string | ArrayBuffer | null;
  confirmPassword: string;
}

export interface User {
  userId: string;
  email: string;
  name: string;
  avatar: string | ArrayBuffer | null;
}

export interface ValidationErrors {
  message: string;
  field_errors: Record<string, string>;
}

export interface ConversationMembers {
  from: string;
  to: string;
}

export interface MessageDetails {
  text: string;
  users: Array<string>;
  sender: string;
  senderAvatar: string| ArrayBuffer | null;
}

export interface AddMemberToSpaceProp {
  spaceId: string;
  user: User;
}

export interface UpdateTaskById {
  taskId: string
  task: TaskProp
}
