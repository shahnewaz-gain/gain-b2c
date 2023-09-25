"use client";

import React, { useState } from "react";
import { useLoginMutation } from "@/lib/redux/auth/authApi";
import { userLogIn } from "@/lib/redux/auth/authSlice";
import { size } from "lodash";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toastAlert } from "@/utils";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [mutationData, setMutationData] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (type, value) => {
    setMutationData((prevData) => ({ ...prevData, [type]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (size(mutationData)) {
      login(mutationData)
        .unwrap()
        .then((payload) => {
          const { accessToken, user } = payload || {};
          const result = {
            accessToken,
            user,
          };

          if (accessToken) {
            Cookies.set("accessToken", accessToken, { expires: 7 });
            dispatch(userLogIn(result));
            router.push("/");
          }
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
            Sign in
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
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
            <div className="form-group mt-2">
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
            <button
              type="submit"
              disabled={isLoading}
              className="btn mt-4 btn-primary"
            >
              {isLoading ? "Authenticating..." : "Sign in"}
            </button>
          </form>

          <p className="text-sm text-center mt-3">
            Do not have an account?{" "}
            <span
              role="button"
              tabIndex="0"
              onClick={() => router.push("/registration")}
              className="text-decoration-underline cursor-pointer"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
