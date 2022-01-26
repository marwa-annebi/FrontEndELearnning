import React, { useEffect } from "react";
import "./Register.css";
import { FileUpload } from "@welcome-ui/file-upload";
import ErrorMessage from "./../../../ErrorMessage";
import bg from "./../../../../assets/bg.png";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import axios from "axios";
import validator from "validator";
import LinearBuffer from "./../../../LinearBuffer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { register } from "../../../../actions/userActions";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Register() {
  const [open, setOpen] = React.useState(false);
  const [openerror, setOpenerror] = React.useState(false);
  const [Validation, setValidation] = useState(false);
  const [email, setemail] = useState("");
  const [first_name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [pic, setpic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setmessage] = useState(null);
  const [messagePic, setmessagePic] = useState(null);
  const [erroremail, seterroremail] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setmessage("Passwords do not match");
    } else {
      dispatch(register(first_name, email, password, pic));
    }
  };
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenerror(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setmessagePic("Please Select an Image");
    }
    setmessagePic(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "3almni");
      data.append("cloud_name", "dknkfvzye");

      fetch("https://api.cloudinary.com/v1_1/dknkfvzye/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setmessagePic("Please Select an Image");
    }
  };

  return (
    <div className="body">
      <Container bg={bg}>
        <Wrapper>
        <Link to='/'>
      <ArrowBackIosIcon color="secondary" style={{marginLeft:"10px",marginTop:"10px"}} />
      </Link>
          {Validation && (
            <Alert severity="success" color="info">
              {Validation}
            </Alert>
          )}
          {error && (
                <Alert severity="error"
                sx={{ width: "100%" }}
                 >
       {error}
     </Alert>
          )}

          {message && (
              <Alert
             
                severity="error"
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
     
          )}
          {loading && <LinearBuffer />}
          <div className="main">
            <h2 className="WelcomeText">Register </h2>

            <Form onSubmit={submitHandler}>
              <div className="InputContainer">
                <input
                  className="StyledInput"
                  type="text"
                  value={first_name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Name"
                />
                <input
                  className="StyledInput"
                  type="text"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  className="StyledInput"
                  type="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password"
                />
                <input
                  className="StyledInput"
                  type="Password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <br />
                {messagePic && (
                  <ErrorMessage variant="danger">{messagePic}</ErrorMessage>
                )}
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />

                  <Fab
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                  >
                    <AddIcon /> Upload photo
                  </Fab>
                </label>
                <div className="ButtonContainer">
                  <button className="bt" onClick={handleClick}>
                    Sign In
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </Wrapper>
      </Container>
    </div>
  );
}

export default Register;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${({ bg }) => bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  /* margin: 2rem; */
  background-color: rgba(255, 255, 255, 0.9);
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(35px);
    backdrop-filter: blur(35px);
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
