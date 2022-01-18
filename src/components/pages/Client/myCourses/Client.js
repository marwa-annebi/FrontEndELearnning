import React, { useState } from 'react'
import Courses from "./Courses.js"
import NavUser from "../../../../components/Header/HeaderUser/NavUser.js"


const Client = () => {

    return (
        <div>
            <NavUser />
            <Courses />
        </div>
    )
}

export default Client