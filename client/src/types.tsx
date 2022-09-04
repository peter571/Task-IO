import { MouseEventHandler } from "react";

export interface ChatProp {
  profileImage: string;
  userName: string;
  previewText: string;
}

export interface SpaceProp {
  spaceImage: string
  spaceName: string
  spaceId: string
}

export interface TaskModalProp {
  id?: string;
  taskId?: string;  
  isOpen: boolean;
  onClose: () => void;
}

export interface TaskProp {
  id?: string;  
  title: string;
  description: string;
  status: string;
  dateline: string;
  openModal?: MouseEventHandler<HTMLDivElement>
}

export interface ModalWrapperProp extends TaskModalProp {
  children: React.ReactNode;
  modalName?: string;  
}
