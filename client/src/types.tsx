import React, { MouseEventHandler } from "react";
import { Socket } from "socket.io-client";

export interface MemberProp {
  email: string;
  name: string;
  _id: string;
  showLastMsg: boolean;
}

export interface ISocket extends Socket {
  sessionID?: string;
  userID?: string;
  username?: string;
}

export interface SpaceProp {
  name: string;
  members: Array<User>;
  admin: string;
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
  _id: string;
  title: string;
  description: string;
  status: string;
  completion_date: string;
  adminId: string;
  assignee: { name: string; _id: string };
  workspace_id: string;
}

export interface NoteProp {
  _id: string;
  title: string;
  workspace_id: string;
  user: string;
  text: string
}

export interface ModalWrapperProp extends TaskModalProp {
  children: React.ReactNode;
  modalName?: string;
}

export interface GlobalUser {
  currentUser: string | null;
}

export interface ProviderProp {
  children: React.ReactNode;
}

export interface FileType {
  name: string
  type: string
  file_url: string
}

export interface MessageProp {
  chat_id: string;
  content: string;
  createdAt: string;
  receiver: string;
  sender: string;
  updatedAt: string;
  workspace_id: string;
  _id: string;
  files: FileType[]
}

export interface SocketMsgProp {
  senderId: string;
  message: string;
  createdAt: any;
  senderAvatar: string;
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
  senderAvatar: string | ArrayBuffer | null;
}

export interface AddMemberToSpaceProp {
  spaceId: string;
  user: User;
}

export interface UpdateTaskById {
  taskId: string;
  task: TaskProp;
}
