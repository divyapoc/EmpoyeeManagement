import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/authAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { unwrapResult } from "@reduxjs/toolkit";
const RegisterForm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    await dispatch(registerUser(data))
      .then(unwrapResult)
      .then((res) => {
        toast.success("Register successful!");
        navigate("/");
      })
      .catch((res) => toast.error(res));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow p-3 mb-5 bg-body rounded"
        style={{ width: "25rem" }}
      >
        <div className="card-body">
          <h2 className="text-center mb-4">Register Now</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="username"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <p className="mt-3">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
