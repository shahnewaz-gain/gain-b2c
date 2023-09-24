"use client";

import { useEffect } from "react";

const GlobalProvider = ({ children }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return children;
};

export default GlobalProvider;
