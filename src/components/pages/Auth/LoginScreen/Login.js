import React, { useState } from "react";
import "./Login.css";
import Icon from "../../../Header/Home/Icon";
import Snackbar from "@mui/material/Snackbar";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Form } from "react-bootstrap";
import LinearBuffer from "../../../LinearBuffer";
import { useHistory } from "react-router";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../actions/userActions";
import { useEffect } from "react";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Login() {
  const [open, setOpen] = React.useState(false);
  const [openerror, setOpenerror] = React.useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo, erroremail } = userLogin;

  useEffect(() => {
    if (!userInfo) {
    } else {
      if (userInfo.isAdmin) history.push("/sidemenu");
      else history.push("/client");
      window.location.reload();
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";
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
  return (
    <div>
      {error && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}
      {erroremail && (
        <Snackbar
          open={openerror}
          autoHideDuration={3000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {erroremail}
          </Alert>
        </Snackbar>
      )}
      {loading && <LinearBuffer />}
      <br />
      <div className="body">
        <Form onSubmit={submitHandler}>
          <div className="Inputcontainer">
            <input
              className="Styledinput"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <input
              className="Styledinput"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="Password"
              placeholder="Password"
            />
          </div>
          <div className="Buttoncontainer">
            <button className="bt" onClick={handleClick}>
              Sign Up
            </button>
          </div>

          <h5 className="LoginWith">Or Login with</h5>
          <hr className="HorizontalRule" />
          <div className="IconsContainer">
            <Icon color={FacebookBackground}>
              <FaFacebookF />
            </Icon>
            <Icon color={InstagramBackground}>
              <FaInstagram />
            </Icon>
            <Icon color={TwitterBackground}>
              <FaTwitter />
            </Icon>
          </div>
          <h4 className="LoginWith">Password Forgot</h4>
        </Form>
      </div>
    </div>
  );
}

export default Login;
