"use client";

import React, { useState } from "react";
import { useRegisterMutation } from "@/lib/redux/auth/authApi";
import { userLogIn } from "@/lib/redux/auth/authSlice";
import { size } from "lodash";
import { useDispatch } from "react-redux";
import { toastAlert } from "@/utils";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const StudentRegistration = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [mutationData, setMutationData] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (type, value) => {
    setMutationData((prevData) => ({ ...prevData, [type]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...mutationData, role: "student" };
    delete updatedData.confirmPassword;

    if (mutationData?.password !== mutationData.confirmPassword) {
      toastAlert("error", "Password does not match!", "top-right");
    } else if (size(updatedData)) {
      register(updatedData)
        .unwrap()
        .then((payload) => {
          const { accessToken, user } = payload;
          const result = {
            accessToken,
            user,
          };

          toastAlert(
            "success",
            "Successfully created an account!",
            "top-right"
          );
          Cookies.set("accessToken", accessToken, { expires: 7 });
          dispatch(userLogIn(result));
          router.push("/");
        })
        .catch((err) => {
          toastAlert("error", err?.data || err?.error, "top-right");
        });
    }
  };

  return (
    <section className="py-5 container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="form-control"
                placeholder="Enter name"
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="form-group  mb-2">
              <label htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-control"
                placeholder="Email address"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-control"
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="confirm-password"
                required
                className="form-control"
                placeholder="Confirm password"
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 btn btn-primary"
            >
              {isLoading ? "Authenticating..." : " Create Account"}
            </button>
          </form>

          <p className="text-sm text-center mt-3">
            Already have an account?{" "}
            <span
              role="button"
              tabIndex="0"
              onClick={() => router.push("/login")}
              className="text-decoration-underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default StudentRegistration;
