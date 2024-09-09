import React from "react";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="bg-black w-full flex flex-col items-center justify-center">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
