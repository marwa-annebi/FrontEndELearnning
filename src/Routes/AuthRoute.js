import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Header/Home/Home"
import { Register } from "../components/pages";

export default function AuthRoute() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
   
    </>
  );
}
