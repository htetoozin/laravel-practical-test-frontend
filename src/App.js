import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Router />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
