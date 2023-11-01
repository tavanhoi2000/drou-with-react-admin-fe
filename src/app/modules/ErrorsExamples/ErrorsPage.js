import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ErrorPage1 } from "./ErrorPage1";
import { ErrorPage2 } from "./ErrorPage2";

export default function ErrorsPage() {
  return (
    <Routes>
      <Navigate from="/error" exact={true} to="/error/error-v1" />
      <Route path="/error/error-v1" component={ErrorPage1} />
      <Route path="/error/error-v2" component={ErrorPage2} />
    </Routes>
  );
}
