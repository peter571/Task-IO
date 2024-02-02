import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { appApi } from "features/api/api";
import { useAccountContext } from "context/AccountContext";
import socket from "socket/socket";
import { logOut } from "features/api/authSlice";
import { useLogoutMutation } from "features/api/authApi";

export default function Nav() {
  const navigate = useNavigate();
  const { user, setUser } = useAccountContext();
  const [logoutCookies] = useLogoutMutation();

  return (
    <Navbar rounded className="fixed w-full bg-navbar">
      <Navbar.Brand>
        <span
          className="self-center whitespace-nowrap text-2xl font-semibold text-[#E459CE]"
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
        {user && (
          <Dropdown.Item>
            <span className="text-custom-blue">{user.name}</span>
          </Dropdown.Item>
        )}
        <Dropdown.Item>
          {" "}
          <span
            role="button"
            onClick={() => {
              appApi.util.resetApiState();
              logoutCookies({});
              logOut({});
              setUser(null);
              localStorage.clear();
              sessionStorage.clear();
              socket.disconnect();
              navigate("/login");
              window.location.reload()
            }}
            className="text-custom-blue"
          >
            {" "}
            Sign out
          </span>
        </Dropdown.Item>
      </Dropdown>
    </Navbar>
  );
}
