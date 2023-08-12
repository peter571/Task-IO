import React from "react";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const isLoading = false;
  const navigate = useNavigate();
  return (
    <form className="auth__form">
      <div className="div-container">
        {/* <h1 className="bold-title text-center text-custom-blue">
          Forgot password
        </h1> */}
        <input
          className="form__input py-2"
          type="email"
          name="name"
          //onChange={handleChange}
          placeholder="Enter you email address..."
          required
        />
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <Loader /> : "Submit"}
        </button>
        <p
          role="button"
          className="text-custom-gray hover:text-custom-blue hover:underline"
          onClick={() => {
            navigate("/login");
          }}
        >
          Go back to login
        </p>
      </div>
    </form>
  );
}
