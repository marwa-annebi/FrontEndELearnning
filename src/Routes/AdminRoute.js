import React from "react";
import Navbar from "../components/Header/HeaderAdmin/Navbar";
import Home from "../components/Header/Home/Home";
import { Route } from "react-router-dom";
import { Register } from "../components/pages";
function AdminRoute() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path="/dashbordAdmin" component={Navbar} />
    </>
  );
}

export default AdminRoute;
