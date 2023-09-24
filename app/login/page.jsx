"use client";

import React, { useState } from "react";
import { useLoginMutation } from "@/lib/redux/auth/authApi";
import { userLogIn } from "@/lib/redux/auth/authSlice";
import { size } from "lodash";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { toastAlert } from "@/utils";

const Login = () => {
  const pathname = usePathname();
  const [login, { isLoading }] = useLoginMutation();
  const [mutationData, setMutationData] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  console.log("mutationData", mutationData);

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
            Cookies.set("userInfo", result);
            dispatch(userLogIn(result));
            router.push("/");
          }
        })
        .catch((err) => {
          toastAlert("danger", err?.data || err?.error, "top-right");
        });
    }
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <Image
            className="h-12 mx-auto"
            src="/assets/images/avatar.png"
            alt="Picture of the author"
            width={100}
            height={100}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                href={pathname}
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              {isLoading ? "Authenticating..." : "Sign in"}
            </button>
          </div>

          {pathname !== "/admin" && (
            <p className="text-sm text-center mt-3">
              Do not have an account?{" "}
              <span
                onClick={() => router.push("/register")}
                className="link-span font-medium text-violet-600 hover:text-violet-500"
              >
                Create an account
              </span>
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Login;
