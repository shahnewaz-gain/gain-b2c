"use client";

import { useEffect } from "react";
import { store } from "@/lib/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const GlobalProvider = ({ children }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Provider store={store}>{children}</Provider>
      <ToastContainer />
    </>
  );
};

export default GlobalProvider;
