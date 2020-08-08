import React, { useState } from "react";
import background from "../../4.jpg";
import shapee from "../../shape1.png";
import { withStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import auth from "../../auth";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

let backStyle = {
  backgroundImage: `url(${background})`,
  height: "750px",

  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
};
let shapeStyle = {
  position: "fixed",
  top: 50,
  left: 800,
  width: "45%",
};

let layer = {
  backgroundColor: "rgba(0, 0, 0, 0)",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "750px",
  backgroundAttachment: "fixed",
};

const styles = {
  input: {
    color: "white",
  },
};
let EmailStyle = {
  position: "fixed",
  left: 900,
  top: 150,
  width: "32.5%",
  height: "10%",

  textAlign: "center",
  fontSize: "20px",
  borderRadius: "10px",
  borderWidth: "0.1px",
  borderColor: "#c2c2c2",
  backgroundColor: "white",

  border: "2px solid #E8E8E8",
  fontFamily: "Arial",
};
let PasswordStyle = {
  width: "32.5%",
  position: "fixed",
  left: 900,
  top: 250,

  height: "10%",

  textAlign: "center",
  fontSize: "20px",
  borderRadius: "10px",
  borderWidth: "0.1px",
  borderColor: "#c2c2c2",
  backgroundColor: "white",

  border: "2px solid #E8E8E8",
  fontFamily: "Arial",
};
let ButtonStyle = {
  position: "fixed",
  left: 900,
  top: 350,
  height: "10%",
  width: "32.5%",

  textAlign: "center",
  fontSize: "25px",
  borderRadius: "10px",
  borderWidth: "0.1px",
  borderColor: "#c2c2c2",
  color: "white",
  backgroundColor: "#7f7aea",

  border: "0px solid #E8E8E8",
  fontFamily: "Arial",
};
let SignUpStyle = {
  position: "fixed",
  left: 900,
  top: 450,
  height: "10%",
  width: "32.5%",

  textAlign: "center",
  fontSize: "25px",
  borderRadius: "10px",
  borderWidth: "0.1px",
  borderColor: "#c2c2c2",
  color: "white",
  backgroundColor: "#faa551",

  border: "0px solid #E8E8E8",
  fontFamily: "Arial",
};

const Signin = (props) => {
  const [info, setInfo] = useState({
    Email: "",
    Password: "",
    FirstName: "",
    LastName: "",
    EmailS: "",
    PasswordS: "",
    openDialog: false,
  });
  const handleClickOpen = (e) => {
    e.preventDefault();
    setInfo({ ...info, openDialog: true });
  };
  const handleClose = () => {
    setInfo({ ...info, openDialog: false });
  };
  const InfoHandler = (e) => {
    const updatedInfo = { ...info, [e.target.name]: e.target.value };
    setInfo(updatedInfo);
  };
  const ButtonHandler = (e) => {
    e.preventDefault();
    //props.history.push("/home");

    auth.login(info.Email, info.Password, () => {
      props.history.push("/home");
      toast.success(`Welcome ${localStorage.getItem("firstName")} ! `);
    });
  };
  const SignUpButtonHandler = () => {
    props.history.push("/home");
    toast.success(`Welcome ${info.Email} ! `);
  };

  return (
    <div style={backStyle}>
      <div style={layer}>
        <div
          style={{
            backgroundColor: "rgb(255,255,255,0.8)",
            backgroundSize: "auto",
            //borderRadius: "130px",
          }}
        ></div>

        <img src={shapee} alt="box" style={shapeStyle} />

        <form>
          <input
            type="text"
            name="Email"
            style={EmailStyle}
            placeholder="Email Address"
            value={info.Email}
            onChange={InfoHandler}
          ></input>
          <input
            type="password"
            name="Password"
            style={PasswordStyle}
            placeholder="Password"
            value={info.Password}
            onChange={InfoHandler}
          ></input>
          <button style={ButtonStyle} onClick={ButtonHandler}>
            Log In
          </button>
          <button style={SignUpStyle} onClick={handleClickOpen}>
            Sign Up
          </button>
        </form>
        <Dialog
          open={info.openDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                autoFocus
                margin="dense"
                label="FirstName"
                name="FirstName"
                type="text"
                value={info.FirstName}
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={InfoHandler}
              />
              <TextField
                margin="dense"
                name="SecondName"
                label="SecondName"
                type="text"
                value={info.SecondName}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
                onChange={InfoHandler}
              />
              <TextField
                margin="dense"
                name="EmailS"
                label="Email"
                type="text"
                value={info.EmailS}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
                onChange={InfoHandler}
              />
              <TextField
                margin="dense"
                name="PasswordS"
                label="Password"
                type="password"
                value={info.PasswordS}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
                onChange={InfoHandler}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={SignUpButtonHandler} color="primary">
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default withStyles(styles)(Signin);
