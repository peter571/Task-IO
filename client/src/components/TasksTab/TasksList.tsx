import { Tabs } from "flowbite-react";
import React, { useState } from "react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdPendingActions } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { AiOutlineFileDone } from "react-icons/ai";
import { TbNotes } from "react-icons/tb";
import AllTasks, { STATUS } from "./AllTasks";
import { useWorkSpaceContext } from "../WorkSpace/WorkSpace";
import UserTasks from "./UserTasks";
import Notes from "../Notes/Notes";

export default function TasksList() {
  const { userIsAdmin } = useWorkSpaceContext();
  const [status, setStatus] = useState<STATUS | string>("all-tasks")

  
  return (
    <Tabs.Group aria-label="Tabs with icons" style="underline" className="mt-2">
      <Tabs.Item
        className="h-full"
        active
        icon={FaTasks}
        title={userIsAdmin ? "All tasks" : "My tasks"}
      >
        {userIsAdmin && (
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setStatus(e.target.value)
            }}
            className="cursor-pointer form__input"
            name="status"
            id="status"
            required
          >
            <option value="all-tasks">All tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        )}
        {userIsAdmin ? <AllTasks status_type={status} /> : <UserTasks />}
      </Tabs.Item>
      <Tabs.Item className="" icon={TbNotes} title="My notes">
        <Notes />
      </Tabs.Item>
    </Tabs.Group>
  );
}
