import React, { useState } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import background from "../background.jpg";
import Title from "./TitleComponent";
import { withStyles } from "@material-ui/core/styles";
import Logos from "./logos";
import SignUp from "./signup";
import { toast } from "react-toastify";
import { PlacesAirportShuttle } from "material-ui/svg-icons";
let backStyle = {
  backgroundImage: `url(${background})`,
  height: "1340px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
};
let stylee = {
  marginLeft: 793,
};
let layer = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "1340px",
  backgroundAttachment: "fixed",
};

const styles = {
  input: {
    color: "white",
  },
};
const Signin = (props) => {
  const [info, setInfo] = useState({
    Email: "",
    Password: "",
  });
  const InfoHandler = (e) => {
    const updatedInfo = { ...info, [e.target.name]: e.target.value };
    setInfo(updatedInfo);
  };
  const ButtonHandler = () => {
    props.history.push("/home");
    toast.success(`Welcome ${info.Email} ! `);
  };
  return (
    <div style={backStyle}>
      <div style={layer}>
        <MuiThemeProvider>
          <div style={stylee}>
            <TextField
              hintText="Enter your Email"
              color="primary"
              hintStyle={{ color: "white" }}
              name="Email"
              floatingLabelText="Email"
              floatingLabelStyle={{ color: "white" }}
              value={info.Email}
              onChange={InfoHandler}
            />
            <TextField
              type="password"
              name="Password"
              ink-color="white"
              hintText="Enter your Password"
              hintStyle={{ color: "white" }}
              floatingLabelText="Password"
              floatingLabelStyle={{ color: "white" }}
              value={info.Password}
              onChange={InfoHandler}
            />
            <RaisedButton
              label="Login"
              primary={true}
              style={style}
              onClick={ButtonHandler}
            />
          </div>
        </MuiThemeProvider>
        <Title />
        <Logos />
        <div
          style={{
            backgroundColor: "rgb(255,255,255,0.8)",
            backgroundSize: "auto",
            borderRadius: "130px",
          }}
        >
          <SignUp />
        </div>
      </div>
    </div>
  );
};

const style = {
  margin: 15,
};
export default withStyles(styles)(Signin);
