import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { RegisterValues } from "../../types";
import { toast } from "react-toastify";
import { useAccountContext } from "../../context/AccountContext";
import { useRegisterMutation } from "../../features/api/authApi";
import { useValidateMemberInviteMutation } from "../../features/api/workspaceApi";
import socket from "../../socket/socket";

export default function Register() {
  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const [validateMemberInvite] = useValidateMemberInviteMutation();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/invite") {
    console.log("Invite page.");
  }

  const { changeHasAccount, setUser } = useAccountContext();
  const [registerDetails, setRegisterDetails] =
    useState<RegisterValues>(initialValues);
  const [register, { isLoading }] = useRegisterMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const payload = await register(registerDetails).unwrap();
      localStorage.setItem("account_user", JSON.stringify(payload));
      //
      socket.auth = { userID: payload.user.userId, sessionID: payload.user.userId}
      socket.connect()

      if (location.pathname === "/invite") {
        const payloadInvite = await validateMemberInvite({
          token,
          userId: payload.user.userId,
        }).unwrap();

        navigate("/");
      } else {
        navigate("/");
      }

      setUser(payload.user);
      setRegisterDetails(initialValues);
      toast.success("Successfully Logged In");
    } catch (error) {
      toast.warn("An error occurred. Check credentials!");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <div className="div-container">
        <h1 className="bold-title text-center text-custom-blue">Register</h1>
        <input
          className="form__input py-2"
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          className="form__input py-2"
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter email"
          required
        />

        <input
          className="form__input py-2"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          className="form__input py-2"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm password"
          required
        />
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <Loader /> : "Register"}
        </button>
        <p className="text-custom-gray">
          Already have an account?{" "}
          <span
            className="text-custom-blue underline"
            role="button"
            onClick={() => changeHasAccount()}
          >
            Log in
          </span>
        </p>
      </div>
    </form>
  );
}
