import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  return (
    <form className="auth__form">
      <div className="div-container">
        <h1 className="logo text-center">Login</h1>
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
        <button onClick={() => navigate("/spaces")} className="btn">
          Log in
        </button>
        <p>
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/register">Register</Link> 
        </p>
      </div>
    </form>
  )
}
