import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { LoginValues } from "../../types";
import { loginUser, userLogin } from "./loginSlice";
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isloading } = useAppSelector(userLogin);
  const [loginDetails, setLoginDetails] = useState<LoginValues>({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const user = await dispatch(loginUser(loginDetails)).unwrap();
      toast.success(`Successfully logged in to ${user.result.name}`)
      navigate('/spaces')
    } catch (error) {
      toast.warn(`${error}`)
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
        />
        <input
          className="form__input py-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn"
          disabled={isloading}
        >
          {isloading ? <Loader /> : "Log in"}
        </button>
        <p>
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/register">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
