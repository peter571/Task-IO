import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { LoginValues } from "../../types";
import { toast } from "react-toastify";
import { useAccountContext } from "../../context/AccountContext";
import { useLoginMutation } from "../../features/api/authApi";
import { useValidateMemberInviteMutation } from "../../features/api/workspaceApi";

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

  if (location.pathname === "/invite") {
    console.log("Invite page.");
  }

  const { changeHasAccount, setUser } = useAccountContext();
  const [loginDetails, setLoginDetails] = useState<LoginValues>(initialValues);
  const [login, { isLoading }] = useLoginMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const payload = await login(loginDetails).unwrap();
  
      if (location.pathname === "/invite") {
        const payloadInvite = await validateMemberInvite({ token, userId: payload.user.userId }).unwrap();
        navigate("/spaces/" + payloadInvite._id);
      } else {
        navigate("/");
      }
  
      localStorage.setItem("account_user", JSON.stringify(payload));
      setUser(payload.user);
      setLoginDetails(initialValues);
      toast.success("Successfully Logged In.");
    } catch (error) {
      toast.warn("An error occurred. Check credentials!");
    }
  }
  

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <div className="div-container">
        <h1 className="logo text-center">Login</h1>
        <input
          className="form__input py-2"
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
        <input
          className="form__input py-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <Loader /> : "Log in"}
        </button>
        <p>
          Don't have an account?{" "}
          <span
            className="text-blue-500"
            role="button"
            onClick={() => changeHasAccount()}
          >
            Register
          </span>
        </p>
      </div>
    </form>
  );
}
