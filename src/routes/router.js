import React from "react";
import { useRoutes } from "react-router-dom";
import { Login, Register } from "../routes/auth";
import { Form } from "./form";
import Auth from "../components/auth/Auth";

const Router = () => {
  let routes = useRoutes([
    {
      element: <Login />,
      path: "/",
    },
    {
      element: <Register />,
      path: "/register",
    },
    {
      element: <Login />,
      path: "*",
    },
    {
      element: <Auth />,
      path: "",
      children: [
        {
          element: <Form />,
          path: "/form",
        },
      ],
    },
  ]);

  return routes;
};

export default Router;
