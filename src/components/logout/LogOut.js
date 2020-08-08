import React from "react";

const LogOut = (props) => {
  const stylee = {
    position: "fixed",
    left: "1300px",
    bottom: "680px ",
    width: "7%",
    color: "white",
    backgroundColor: "#7f7aea",
    fontSize: "12px",
    height: "3%",
    borderWidth: "0.1px",
    borderColor: "#c2c2c2",
    border: "0px solid #E8E8E8",
  };
  const buttonHandler = () => {
    localStorage.removeItem("accessToken");
    props.history.push("/");
  };
  return (
    <button style={stylee} onClick={buttonHandler}>
      Log Out
    </button>
  );
};
export default LogOut;
