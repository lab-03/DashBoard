import React, { useState } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import background from "../background.jpg";

let backStyle = {
  backgroundImage: `url(${background})`,
  height: "1000px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};
let stylee = {
  marginLeft: 793,
};
const Signin = () => {
  const [info, setInfo] = useState({
    Email: "",
    Password: "",
  });
  const InfoHandler = (e) => {
    const updatedInfo = { ...info, [e.target.name]: e.target.value };
    setInfo(updatedInfo);
  };
  const ButtonHandler = () => {
    window.location = "http://localhost:3000/home";
  };
  return (
    <div style={backStyle}>
      <MuiThemeProvider>
        <div style={stylee}>
          <TextField
            hintText="Enter your Email"
            name="Email"
            floatingLabelText="Email"
            value={info.Email}
            onChange={InfoHandler}
          />

          <TextField
            type="password"
            name="Password"
            hintText="Enter your Password"
            floatingLabelText="Password"
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
    </div>
  );
};

const style = {
  margin: 15,
};
export default Signin;
