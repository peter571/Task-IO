import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <Navbar rounded className="fixed w-full bg-navbar">
      <Navbar.Brand>
        <span
          className="self-center whitespace-nowrap text-xl font-semibold"
          role="button"
          onClick={() => navigate("/")}
        >
          Task IO
        </span>
      </Navbar.Brand>

      <Dropdown
        inline
        label={<Avatar className="cursor-pointer" rounded />}
        dismissOnClick={true}
      >
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
    </Navbar>
  );
}
