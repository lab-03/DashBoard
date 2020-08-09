import React, { useState } from "react";
import logos1 from "../../logos1.png";
import home1 from "../../tst11.png";
import { withStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import auth from "../../auth";
import SignUp from "./SignUp";
import "./signin.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const styles = {
  input: {
    color: "white",
  },
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
    if (!info.Email || !info.Password) alert("Please enter email and password");
    e.preventDefault();

    auth.login(info.Email, info.Password, (res) => {
      if (res) {
        props.history.push("/home");
        toast.success(`Welcome ${localStorage.getItem("firstName")} ! `);
      } else alert("invalid email or password");
    });
  };
  const SignUpButtonHandler = () => {
    if (!info.FirstName || !info.LastName || !info.EmailS || !info.PasswordS)
      alert("Please fill in all fields");
    else {
      SignUp.SignUp(
        info.FirstName,
        info.LastName,
        info.EmailS,
        info.PasswordS,
        (res) => {
          console.log(res);
          if (res) {
            handleClose();
            alert("SignUp succeeded you can login now!");
            // props.history.push("/home");
            // toast.success(`Welcome ${localStorage.getItem("firstName")} ! `);
          } else alert("OOps something happened please try again!");
        }
      );
    }
  };

  return (
    <div className="MainDiv">
      <div className="Main">
        <img src={home1} alt="logo" />

        <form className="formClass">
          <input
            type="text"
            name="Email"
            // style={EmailStyle}
            className="EmailClass"
            placeholder="Email Address"
            value={info.Email}
            onChange={InfoHandler}
          ></input>
          <input
            type="password"
            name="Password"
            //style={PasswordStyle}
            className="PasswordClass"
            placeholder="Password"
            value={info.Password}
            onChange={InfoHandler}
          ></input>
          <button
            className="grow"
            //style={ButtonStyle}
            id="btn-1"
            onClick={ButtonHandler}
          >
            Log In
          </button>
          <button
            className="grow"
            style={{ backgroundColor: "#faa551" }}
            id="btn-2"
            onClick={handleClickOpen}
          >
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
                name="LastName"
                label="LastName"
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

      <div className="logos">{<img src={logos1} alt="logos" />}</div>
    </div>
  );
};

export default withStyles(styles)(Signin);
