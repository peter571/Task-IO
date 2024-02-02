import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "components/Loader/Loader";
import { RegisterValues } from "@/types";
import { toast } from "react-toastify";
import { useAccountContext } from "context/AccountContext";
import { useRegisterMutation } from "features/api/authApi";
import { useValidateMemberInviteMutation } from "features/api/workspaceApi";
import socket from "socket/socket";
import { useAppDispatch } from "hooks/redux";
import { setCredentials } from "features/api/authSlice";

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
  const dispatch = useAppDispatch()

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
      dispatch(
        setCredentials({ user: { ...payload }, token: payload.accessToken })
      );
      socket.auth = {
        userID: payload.user.userId,
        sessionID: payload.user.userId,
      };
      socket.connect();

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
          minLength={2}
          maxLength={20}
        />
        <input
          className="form__input py-2"
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter email"
          required
          maxLength={320}
        />

        <input
          className="form__input py-2"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
          minLength={8}
          maxLength={32}
        />
        <input
          className="form__input py-2"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm password"
          required
          minLength={8}
          maxLength={32}
        />
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <Loader /> : "Register"}
        </button>
        <p
          role="button"
          className="text-custom-gray hover:text-custom-blue hover:underline"
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          Forgot password?
        </p>
        <p className="text-custom-gray">
          Already have an account?{" "}
          <span
            className="text-custom-blue underline"
            role="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </span>
        </p>
      </div>
    </form>
  );
}
