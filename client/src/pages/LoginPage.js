import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Features/authAction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    if (state.userToken) {
      navigate("/home");
    }
  }, [navigate, state.userToken]);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
     await dispatch(userLogin(data))
      .then(unwrapResult)
      .then((res) => toast.success('Login successful!'))
      .catch((res) => toast.error(res));
    // if (userLogin.fulfilled.match(resultAction)) {
    //   toast.success('Login successful!');
    // } else if (userLogin.rejected.match(resultAction)) {
    //   toast.error(state.error);
    // }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow p-3 mb-5 bg-body rounded"
        style={{ width: "25rem" }}
      >
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              Login
            </button>
            <p className="mt-3">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
