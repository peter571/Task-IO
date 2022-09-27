export const Status = {
  PENDING: "pending",
  COMPLETED: "completed",
};

export const MODALS = {
  taskform: "task-form",
  taskModal: "task-modal",
  newSpaceModal: "new-space-modal",
  joinSpaceModal: "join-space-modal"
};

export enum userActionTypes {
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  RESET = "reset",
  CHANGEPASSWORD = "changepassword",
  AUTH_REQUEST = "auth_request"
}

export enum STATE {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed'
}
