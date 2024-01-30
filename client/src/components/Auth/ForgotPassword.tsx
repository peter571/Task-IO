import React, { useState, useRef } from "react";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useSendResetEmailMutation } from "../../features/api/authApi";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [sendResetEmail, { isLoading }] = useSendResetEmailMutation();

  const handleSubmit = async () => {
    try {
      if (emailRef.current) {
        await sendResetEmail(emailRef.current.value)
          .unwrap()
          .then(() => {
            setEmailSent(true);
          });
        emailRef.current.value = "";
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form className="auth__form">
      <div className="div-container">
        <input
          className="form__input py-2"
          type="email"
          name="name"
          ref={emailRef}
          placeholder="Enter you email address..."
          onFocus={() => {
            setEmailSent(false);
          }}
          required
        />
        {emailSent && (
          <p className="text-green-700">
            You will receive a reset email if user with that email exist!
          </p>
        )}
        <button
          onClick={handleSubmit}
          type="button"
          className="btn"
          disabled={isLoading}
        >
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
