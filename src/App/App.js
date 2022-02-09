import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavUser from "../components/Header/HeaderUser/NavUser.js";

import Client from "../components/pages/Client/MyCourses/Client.js";
import MyNotes from "../components/pages/Client/MyCourses/MyNotes.js";
import { Register } from "../components/pages/index.js";
import Navbar from "./../components/Header/HeaderAdmin/Navbar";
import Home from "./../components/Header/Home/Home";
import ProfileScreen from "./../components/pages/ProfileScreen/ProfileScreen.js";
import CreateNote from "../components/pages/Client/MyCourses/CreateNote.js";
import UpdateNote from "../components/pages/Client/MyCourses/UpdateNote.js";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/update/:id"
        >
          <UpdateNote />
        </Route>
      <Route path="/client">
          <Client />
        </Route>
   
        <Route path="/createnote">
          <CreateNote />
        </Route>
        <Route path="/headerUser">
          <NavUser />
        </Route>
        
     
        <Route path="/sidemenu">
          <Navbar />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <ProfileScreen />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
