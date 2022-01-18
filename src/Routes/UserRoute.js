import React from "react";
import { Route } from "react-router-dom";
import NavUser from "../components/Header/HeaderUser/NavUser";
import Courses from "../components/pages/Client/myCourses/Courses.js";
import Home from "../components/Header/Home/Home";
import { Register } from "../components/pages";
import Client from "../components/pages/Client/myCourses/Client";
import ProfileScreen from "../components/pages/ProfileScreen/ProfileScreen.js";

function UserRoute() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path='/PageUser' component={NavUser} />
      <Route exact path='/Courses' component={Courses} />
      <Route exact path='/client' component={Client} />
      <Route exact path='/profile' component={ProfileScreen} />
    </>
  );
}

export default UserRoute;
