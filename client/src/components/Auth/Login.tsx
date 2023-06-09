import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { LoginValues } from "../../types";
import { toast } from "react-toastify";
import { useAccountContext } from "../../context/AccountContext";
import { useLoginMutation } from "../../features/api/authApi";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
 
  const { changeHasAccount, setUser } = useAccountContext();
  const [loginDetails, setLoginDetails] = useState<LoginValues>(initialValues);
  const [login, { data, isLoading }] = useLoginMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(loginDetails).then(() => {
        localStorage.setItem("account_user", JSON.stringify(data));
        setUser(data)
        setLoginDetails(initialValues);
        toast.success(`Successfully Logged In.`);
        navigate("/spaces");
      });
    } catch (error) {
      toast.warn(`${error}`);
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
          <Link
            className="text-blue-500"
            to="/"
            onClick={() => changeHasAccount()}
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
