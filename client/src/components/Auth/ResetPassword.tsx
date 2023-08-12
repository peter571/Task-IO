import React from "react";
import Loader from "../Loader/Loader";

export default function ResetPassword() {
  const [credentials, setCredentials] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const isLoading = false;

  return (
    <form className="auth__form">
      <div className="div-container">
      <h1 className="bold-title text-center text-custom-blue cursor-default">Reset password</h1>
        <input
          className="form__input py-2"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="New password"
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
          {isLoading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
}
