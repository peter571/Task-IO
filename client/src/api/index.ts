import axios, { AxiosResponse } from "axios";
import {
  RegisterValues,
  LoginValues,
  SpaceProp,
  User,
  TaskProp,
  ConversationMembers,
  MessageDetails,
} from "../types";

const API = axios.create({
  baseURL: "http://localhost:5000/",
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("account_user");
  let token: string | null;
  if (typeof user === "string") {
    let user_token = JSON.parse(user);
    token = user_token.token;
  } else {
    token = null;
  }
  req.headers!.Authorization = `Bearer ${token}`;
  return req;
});

const responseBody = (response: AxiosResponse) => response;

const requests = {
  get: (url: string) => API.get(url).then(responseBody),
  post: (url: string, body: {}) => API.post(url, body).then(responseBody),
  patch: (url: string, body: {}) => API.patch(url, body).then(responseBody),
  delete: (url: string) => API.delete(url).then(responseBody),
};

// Users
export const usersAPI = {
  registerUser: (signupData: RegisterValues): Promise<AxiosResponse<any>> =>
    requests.post("/users/register", signupData),
  loginUser: (siginData: LoginValues): Promise<AxiosResponse<any>> =>
    requests.post("/users/login", siginData),
};

// Spaces
export const spacesAPI = {
  addNewSpace: (spaceDetails: SpaceProp): Promise<AxiosResponse<any>> =>
    requests.post("/spaces", spaceDetails),
  getSpacesByUserId: (userId: string): Promise<AxiosResponse<any>> =>
    requests.get(`/spaces/get-user-spaces/${userId}`),
  addMemberToSpace: (
    spaceId: string,
    user: User
  ): Promise<AxiosResponse<any>> =>
    requests.patch(`/spaces/space/${spaceId}/add-member`, user),
    
  getSpaceMembersBySpaceId: (spaceId: string): Promise<AxiosResponse<any>> =>
    requests.get(`/spaces/get-space-members/${spaceId}`),
};

// Tasks
export const tasksAPI = {
  addNewTask: (task: TaskProp): Promise<AxiosResponse<any>> =>
    requests.post("/tasks", task),
  updateTaskById: (
    taskId: string,
    task: TaskProp
  ): Promise<AxiosResponse<any>> => requests.patch(`/tasks/${taskId}`, task),
  deleTaskById: (taskId: string): Promise<AxiosResponse<any>> =>
    requests.delete(`/tasks/${taskId}`),
  getTasksByUserId: (userId: string): Promise<AxiosResponse<any>> =>
    requests.get(`/tasks/${userId}`),
};

// Messages
export const messagesAPI = {
  addNewMessage: (
    messageDetails: MessageDetails
  ): Promise<AxiosResponse<any>> => requests.post("/messages", messageDetails),
  getUsersConversations: (
    users: ConversationMembers
  ): Promise<AxiosResponse<any>> =>
    requests.get(`/messages/${users.from}-${users.to}`),
};
