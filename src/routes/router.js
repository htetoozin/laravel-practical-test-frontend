import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register } from "../routes/auth";
const Router = (props) => {
  //   const auth = useSelector((state) => state.auth);

  //Logout when token is expired
  //   const expiredTime = auth.expired_at;
  //   // console.log('current time ', Date.now(), expiredTime * 1000)

  //   if (expiredTime * 1000 < Date.now()) {
  //     // console.log('expired ')
  //     localStorage.removeItem("user");
  //   }
  return (
    <>
      <Routes>
        <Route path="/" name="Login Page" element={<Login />} />
        <Route path="/register" name="Register Page" element={<Register />} />
      </Routes>
    </>
  );
};

export default Router;
