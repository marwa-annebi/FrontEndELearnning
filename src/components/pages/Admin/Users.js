import React, { useEffect } from "react";
import UsersForm from "./UsersForm";
import useTable from "../../useTable";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import PageHeader from "./../../Header/HeaderAdmin/PageHeader";
import {
  makeStyles,
  Paper,
  TableBody,
  InputAdornment,
} from "@material-ui/core";
import { Form } from "react-bootstrap";
import CheckIcon from "@mui/icons-material/Check";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import controls from "./../../Controls/controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import { Toolbar } from "@material-ui/core";
import { useState } from "react";
import Popup from "../../Popup";
import axios from "axios";
import { Table, TableCell, TableRow } from "@mui/material";
import ConfirmDialog from "../../ConfirmDialog";
import Notification from "../../Notification";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "55%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "first_name", label: "User Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "isAdmin", label: "is Admin" },
  { id: "isTeacher", label: "is Teacher" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const Users = () => {
  const classes = useStyles();
  const [userList, setuserList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const loadUsers = async () => {
    const result = await axios.get("/api/users/read");
    setuserList(result.data.reverse());
  };
  useEffect(
    () => {
      loadUsers();
    },
    [],
    [userList]
  );
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(userList, headCells, filterFn);

  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
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
  const deleteUser = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    await axios.delete(`/api/users/remove/${id}`);
    loadUsers();
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };
  const addOrEdit = (user, resetForm) => {
    if (user._id == 0) axios.post("/api/users/add", user);
    else axios.put("api/users/update/${id}", user);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    loadUsers();
  };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  return (
    <>
      <PageHeader
        title="New Employee"
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

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
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.first_name}</TableCell>
                <TableCell>{item.email}</TableCell>

                <TableCell>
                  {" "}
                  <Form.Check
                    type="checkbox"
                    checked={item.isAdmin}
                    onChange={(e) => {
                      setIsAdmin(e.target.checked);
                    }}
                  ></Form.Check>
                </TableCell>
                <TableCell>
                  {" "}
                  <Form.Check
                    type="checkbox"
                    checked={item.isTeacher}
                    onChange={(e) => {
                      setIsTeacher(e.target.checked);
                    }}
                  ></Form.Check>
                </TableCell>
                <TableCell>
                  <controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </controls.ActionButton>
                  <controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          deleteUser(item._id);
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UsersForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
    </>
  );
};

export default Users;
