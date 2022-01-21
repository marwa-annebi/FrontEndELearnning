import React from 'react'
import SideMenu from './SideMenu';
import Header from './Header';
import "./HeaderAdmin.css"
import { useState } from 'react';
import './HeaderAdmin.css';
import { CssBaseline, createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core";
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

const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})
const Navbar = () => {
  const classes = useStyles();
  const [inactive, setInactive] = useState(false);

  return (
    <ThemeProvider theme={theme}>
    <SideMenu />
    <div className={classes.appMain}>
            <Header />
           <Users />
          </div>
     

        <CssBaseline />

    </ThemeProvider>
  );
}

export default Navbar
