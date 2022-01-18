import React from 'react'
import { PeopleOutlineTwoToneIcon } from '@mui/icons-material/PeopleOutlineTwoTone';
import UsersForm from './UsersForm';
import useTable from '../../useTable';
import PageHeader from './../../Header/HeaderAdmin/PageHeader';
import { makeStyles, Paper, TableBody, InputAdornment } from '@material-ui/core';
import controls from './../../Controls/controls';
import { AddIcon } from '@material-ui/icons/Add';
import { Search } from '@material-ui/icons';
import { Toolbar } from '@material-ui/core';
import { useState } from 'react';
import Popup from '../../Popup';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding:theme.spacing(3)
    },
    searchInput: {
        width: '55%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const Users = () => {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);

    const [filterFn, setFilterFn] = useState({
      fn: (items) => {
        return items;
      },
    });

      const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
          fn: (items) => {
            if (target.value == "") return items;
            else
              return items.filter((x) =>
                x.fullName.toLowerCase().includes(target.value)
              );
          },
        });
      }; 
    const openInPopup = (item) => {
      setRecordForEdit(item);
      setOpenPopup(true);
    };
    
    const { TblContainer, TblHead }
    =useTable(headCells);
    return (
      <>
        <PageHeader title="New User" subTitle="Form design with validation" />
        <Paper className={classes.pageContent}>
          <Toolbar>
            <controls.Input
              label="Search Employees"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <controls.Button
              text="Add user"
              className={classes.newButton}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            ></controls.Button>
          </Toolbar>

          {/* <UsersForm /> */}
          <TblContainer>
            <h1>heloo</h1>
          </TblContainer>
        </Paper>
        <Popup
          title="Employee Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <UsersForm recordForEdit={recordForEdit}  />
        </Popup>
      </>
    );
}

export default Users
