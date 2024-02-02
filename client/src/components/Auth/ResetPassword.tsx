import React from "react";
import Loader from "components/Loader/Loader";
import { useResetPasswordMutation } from "features/api/authApi";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [resetPassword, { isLoading, isSuccess, isError }] = useResetPasswordMutation();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("reset_token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (credentials.password !== credentials.confirmPassword) {
        alert("Passwords must match!");
        return;
      }
      await resetPassword({ ...credentials, resetToken: token })
        .unwrap()
        .then(() => {
          setCredentials({ password: "", confirmPassword: "" });
          navigate("/reset-password");
        });
    } catch (error) {}
  };

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      <div className="div-container">
        <h1 className="bold-title text-center text-custom-blue cursor-default">
          Reset password
        </h1>
        <input
          className="form__input py-2"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="New password"
          value={credentials.password}
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
          value={credentials.confirmPassword}
          required
          minLength={8}
          maxLength={32}
        />
        {isSuccess && <p className="text-green-700">Password reset successfull!</p>}
        {isError && <p className="text-red-500">An error occurred!</p>}
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
