import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { RegisterValues } from "../../types";
import { toast } from "react-toastify";
import { useAccountContext } from "../../context/AccountContext";
import { useRegisterMutation } from "../../features/api/authApi";

export default function Register() {
  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  };
  const navigate = useNavigate();

  const { changeHasAccount, setUser } = useAccountContext();
  const [registerDetails, setRegisterDetails] =
    useState<RegisterValues>(initialValues);
  const [register, { isLoading }] = useRegisterMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await register(registerDetails).unwrap().then((payload) => {
        localStorage.setItem("account_user", JSON.stringify(payload));
        setUser(payload.user)
        setRegisterDetails(initialValues);
        toast.success("Successfully Logged In");
        navigate("/");
      });
    } catch (error) {
      toast.warn(`An error occured. Check credentials!`);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  }

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onload = function () {
      const imgUrl = reader.result;
      setRegisterDetails({ ...registerDetails, avatar: imgUrl });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <div className="div-container">
        <h1 className="logo text-center">Register</h1>
        <input
          className="form__input py-2"
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          className="form__input py-2"
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        <input
          className="form__input py-2 cursor-pointer"
          type="file"
          name="avatar"
          onChange={handleImageInput}
          placeholder="Choose profile image"
          required
        />
        <input
          className="form__input py-2"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
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
          {isLoading ? <Loader /> : "Register"}
        </button>
        <p>
          Already have an account?{" "}
          <Link
            className="text-blue-500"
            to="/"
            onClick={() => changeHasAccount()}
          >
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}
