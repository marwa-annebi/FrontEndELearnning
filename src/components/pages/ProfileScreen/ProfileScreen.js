import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../actions/userActions.js";
import ErrorMessage from "../../ErrorMessage.js";
import LinearBuffer from "../../LinearBuffer.js";
import { Link, useHistory } from "react-router-dom";
// import MainScreen from '../../components/MainScreen'
import "./ProfileScreen.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const ProfileScreen = ({ location, history }) => {
  const [message, setmessage] = useState(null);
  const [first_name, setName] = useState("");
  const [_id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [pic, setPic] = useState();

  const dispatch = useDispatch();
 
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/client");
    } 
    else {
      setName(userInfo.first_name);
      setEmail(userInfo.email);
      setId(userInfo._id);
      setPic(userInfo.pic);
 
     
      
    }
  }, [history, userInfo]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "3almni");
      data.append("cloud_name", "dknkfvzye");
      fetch("https://api.cloudinary.com/v1_1/dknkfvzye/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          setPic(data.url.toString());

          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const Cancel = () => {
    history.push("/client");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setmessage("Passwords do not match");
    } else {
    dispatch(updateProfile({ first_name, email, password, pic }));}
  };

  return (
    // <MainScreen title="EDIT PROFILE">

    <div className="container">
      <div style={{display:"flex"}}>
         <Link to='/client'>
      <ArrowBackIosIcon color="secondary" style={{marginLeft:"10px",marginTop:"10px"}} />
      </Link>
      <h1>Edit Profile</h1></div>
      <Row className="profileContainer">
        <Col md={6}>
          <Form onSubmit={submitHandler}>
      {message && <ErrorMessage variant="danger"> {message} </ErrorMessage> }

            {loading && <LinearBuffer />}
            {success && (
              <ErrorMessage variant="success">
                Updated Successfully
              </ErrorMessage>
            )}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={first_name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
         
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>{" "}
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group controlId="pic">
              <Form.Label>Change Profile Picture</Form.Label>
              {/*<Form.File
                    onChange={(e) => postDetails(e.target.files[0])}
                    id="custom-file"
                    type="image/png"
                    label="Upload Profile Picture"
                    custom
                  /> */}

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
                  <AddIcon />
                </Fab>
              </label>
            </Form.Group>{" "}
            <Button type="submit" varient="primary">
              Update
            </Button>
          </Form>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={pic} alt={first_name} className="profilePic" />
        </Col>
      </Row>
    </div>
    //   </MainScreen>
  );
};

export default ProfileScreen;
