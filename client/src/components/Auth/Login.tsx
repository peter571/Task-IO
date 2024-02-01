import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { LoginValues } from "../../types";
import { toast } from "react-toastify";
import { useAccountContext } from "../../context/AccountContext";
import { useLoginMutation } from "../../features/api/authApi";
import { useValidateMemberInviteMutation } from "../../features/api/workspaceApi";
import socket from "../../socket/socket";
import { useAppDispatch } from "../../hooks/redux";
import { setCredentials } from "../../features/api/authSlice";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const [validateMemberInvite] = useValidateMemberInviteMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { changeHasAccount, setUser } = useAccountContext();
  const [loginDetails, setLoginDetails] = useState<LoginValues>(initialValues);
  const [login, { isLoading }] = useLoginMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const payload = await login(loginDetails).unwrap();
      dispatch(
        setCredentials({ user: { ...payload.user }, token: payload.accessToken })
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
      setLoginDetails(initialValues);
      toast.success("Successfully Logged In.");
    } catch (error) {
      console.log(error)
      toast.warn("An error occurred. Check credentials!");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <div className="div-container">
        <h1 className="bold-title text-center text-custom-blue">Login</h1>
        <input
          className="form__input py-2"
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
          minLength={2}
          maxLength={320}
        />
        <input
          className="form__input py-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          minLength={8}
          maxLength={32}
        />
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <Loader /> : "Log in"}
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
          Don't have an account?{" "}
          <span
            className="text-custom-blue underline"
            role="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </span>
        </p>
      </div>
    </form>
  );
}
