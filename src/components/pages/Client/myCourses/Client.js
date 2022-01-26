import React, { useState } from "react";
import NavUser from "../../../Header/HeaderUser/NavUser.js";
import MyNotes from "./MyNotes.js";

const Client = () => {
  return (
    <div>
      <NavUser />
      <MyNotes />
    </div>
  );
};

export default Client;
