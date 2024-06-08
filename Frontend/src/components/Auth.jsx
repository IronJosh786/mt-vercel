import React from "react";
import Login from "../pages/Login";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Auth() {
  const { userData } = useSelector((state) => state.user);

  let token = userData?.token ? userData?.token : null;

  if (!token) {
    const localStorageItem = JSON.parse(localStorage.getItem("userData"));
    if (localStorageItem) {
      const isExpired = Date.now() > localStorageItem.expiry;
      if (!isExpired) {
        token = localStorageItem.token;
      }
    }
  }

  if (!token) {
    return <Login />;
  }
  return <Outlet />;
}

export default Auth;
