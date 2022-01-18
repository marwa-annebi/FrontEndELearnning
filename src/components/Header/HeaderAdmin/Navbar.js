import React from 'react'
import SideMenu from './SideMenu';
import Header from './Header';
import "./HeaderAdmin.css"
import { useState } from 'react';
import './HeaderAdmin.css';
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Users from './../../pages/Admin/Users'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../../actions/userActions';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const Navbar = () => {
  
  const [inactive, setInactive] = useState(false);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <SideMenu
          onCollapse={(inactive) => {
            console.log(inactive);
            setInactive(inactive);
          }}
        />
        <div className={`container ${inactive ? "inactive" : ""}`}>
          <div>
            <Header />
           <Users />
          </div>
        </div>

        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default Navbar
