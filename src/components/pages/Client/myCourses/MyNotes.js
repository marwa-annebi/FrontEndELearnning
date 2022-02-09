import AddIcon from "@material-ui/icons/Add";
import {
  makeStyles,
  
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { React, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ConfirmDialog from "../../../ConfirmDialog";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";

import { deleteNoteAction, listNotes } from "../../../../actions/CourseAction";
import ErrorMessage from "../../../ErrorMessage";
import Loading from "../../../Loading";
import { Button, Grid } from "@mui/material";

import axios from "axios";
import Notification from "../../../Notification";
import controls from "../../../Controls/controls";
import { Badge } from "react-bootstrap";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const useStyles = makeStyles((theme) => ({
  
  newButton: {

    marginLeft:"50px"
  },
}));
function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  const CourseList = useSelector((state) => state.CourseList);
  const { loading, error, notes } = CourseList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate ,errorCreate} = noteCreate;

  // const noteUpdate = useSelector((state) => state.noteUpdate);
  // const { success: successUpdate } = noteUpdate;
  const saveFile = () => {};
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    //successUpdate,
  ]);

  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const MyOptions = ["Edit Course", "Delete Course"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const deleteUser = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteNoteAction(id));
    dispatch(listNotes());

    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };
  const classes = useStyles();

  return (
    //<MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
    <div style={{ marginTop: "50px" }}>
      <div>
        {userInfo.isTeacher && (
          <Link to="/createnote">
            <controls.Button
            text="Add New Course"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}

          />
          </Link>
        )}
      </div>
    

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {/* {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )} */}
      {loading && <Loading />}
      {/* {loadingDelete && <Loading />} */}
      <Grid
        container
        rowSpacing={0}
        style={{ marginLeft: "50px", marginTop: "50px" }}
        alignItems="center"
      >
        {notes?.map((note, id) => (
          <Grid item xs={4} style={{ marginBottom: "20px" }}>
            <Card sx={{ maxWidth: 350 }} key={id}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    src={userInfo.pic}
                  ></Avatar>
                }
                action={
                  <div>
                    <IconButton
                      aria-label="more"
                      onClick={handleClick}
                      aria-haspopup="true"
                      aria-controls="long-menu"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      onClose={handleClose}
                      open={open}
                    >
                      
                        <MenuItem>
                        <Button href={`/update/${note._id}`}>Edit Course  </Button></MenuItem>
                    

                        <MenuItem color="secondary">
                        
                      <Button
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              deleteUser(note._id);
                            },
                          });
                        }}
                      >
                     
                          Delete Course
                          </Button>
                        </MenuItem>
                    </Menu>
                  </div>
                }
                title ={note.title}
                subheader={new Date().toLocaleDateString()}
              />
              <CardMedia
                component="img"
                height="194"
                image={note.imageUrl}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
     
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
   
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  {/* <Typography paragraph>Method:</Typography> */}
                  <Typography paragraph>
                    {note.content}
                    <br />
                    <a
                      className="btn btn-primary cursor-pointer text-white"
                      href={note.file}
                      download={note.file}
                    >
                      Download
                    </a>
                    {/* console.log({note.file}) */}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
            {/* <DownloadLink
              label="Download"
              filename="fileName.txt"
              exportFile= {note.file}
            />{" "} */}
            {/* <Link to={note.file} target="_blank" download>Download</Link> */}
            {/* <Button onClick={saveAs(note.file, "example.pdf")}>download</Button> */}
          </Grid>
        ))}
        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Grid>
    </div>
  );
}

export default MyNotes;
