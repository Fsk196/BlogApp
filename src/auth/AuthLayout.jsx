import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../lib/api";

const AuthLayout = ({ isPrivate }) => {
  const isLogged = useSelector((state) => state.auth.status);

  return isPrivate ? (
    isLogged ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    )
  ) : isLogged ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default AuthLayout;
