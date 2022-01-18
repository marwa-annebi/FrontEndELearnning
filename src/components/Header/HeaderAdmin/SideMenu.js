import React from 'react'
import logo from './../../../assets/logo copy.png'
import { InputAdornment, makeStyles } from '@material-ui/core';
import { cursor, marginTop, overflow } from '@xstyled/system';
import { FaBorderNone } from 'react-icons/fa';
import './HeaderAdmin.css'
import { useState } from 'react';
import MenuItem from './MenuItem';
import { useEffect } from 'react';
const styles = makeStyles({
  sideMenu: {
    position: "absolute",
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    width: "300px",
    height: "99%",
    display: "flex",
    borderRadius: 5,
    padding: "30px 20px",
    margin: 3,
    boxSizing: "border-box",
  },
  Logo: {
    cursor: "pointer",
    overflow: "hidden",
    display: "inline-block",
  },
  togglemenubtn: {
    color: "white",
    fontSize: "20px",
    position: "absolute",
    top: "10%",
    transform: "translateY(-50%)",
    right: "-105px",
    cursor: "pointer",
  },
  topSection: {
    position: "relative",
  },
  search: {
    border: 0,
    outline: "none",
    background: "#14163c",
    borderRadius: "5px",
    display: "block",
    padding: "10px 40px",
    margin: "40px 0",
    width: "90%%",
  },
  serachDiv: {
    position: "absolute",
    marginTop: 70,
  },
  searchbtn: {
    width: "40px",
    marginTop: "40px",
    height: "35px",
    position: "absolute",
    background: "transparent",
    border: 0,
    fontSize: "20px",
    color: "#666",
  },
  divider: {
    width: "90%",
    height: "1px",
    borderRadius: "1px",
      backgroundColor: "#14163c",
      position: "absolute",
      marginTop: "60%",
      left:15
    
  },
});
export const menuItems = [
  {
    name: "Dashboard",
    exact: true,
 
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "Users",
    exact: true,
    
    iconClassName: "bi bi-speedometer2",
  },
  {
    name: "Courses",
    iconClassName: "bi bi-vector-pen",
  },
];

const SideMenu = (props) => {
  
    const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        console.log(next);
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="topSection">
        <div className="Logo">
          <img src={logo} alt="webscript" />
        </div>
        <div className="togglemenubtn" onClick={() => setInactive(!inactive)}>
          <i class="bi bi-chevron-double-left"></i>
        </div>
      </div>
      <div className="serachDiv">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>
        <input type="text" placeholder="search" />
      </div>
      <div className="divider"></div>
      <div className="main-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
            
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu
