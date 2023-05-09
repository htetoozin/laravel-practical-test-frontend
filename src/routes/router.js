import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, Register } from "../routes/auth";
import { Form } from "./form";
const Router = (props) => {
  let token = JSON.parse(localStorage.getItem("token"));
  console.log(token, "token");

  return (
    <>
      <Routes>
        {/* {!token ? ( */}
        <>
          {/* <Route path="/" name="Login Page" element={<Login />} />
          <Route path="/register" name="Register Page" element={<Register />} /> */}
          <Route path="/form" name="Form" element={<Form />} />

          {/* <Route path="*" name="Login Page" element={<Navigate to="/" />} /> */}
        </>
        {/* ) : ( // <p>Demo</p>
        <Route path="/form" name="Form" element={<Form />} />
        )} // */}
      </Routes>
    </>
  );
};

export default Router;
