import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  return (
    <form className="login__form">
      <div className="flex flex-col gap-4 w-full sm:w-[70%] md:w-[50%] lg:w-[30%]">
        <h1 className="logo text-center">Task Manager</h1>
        <input
          className="form__input py-2"
          type="email"
          placeholder="Enter email"
        />
        <input
          className="form__input py-2"
          type="password"
          placeholder="Password"
        />
        <button onClick={() => navigate("/main")} className="btn">
          Sign In
        </button>
      </div>
    </form>
  );
}
