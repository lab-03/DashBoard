import React from "react";
import Courses from "../coursesList/coursesList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "../logout/LogOut";
const HomePage = (props) => {
  return (
    <div>
      <ToastContainer autoClose={3000} hideProgressBar />
      {console.log(props.history)}
      <Courses history={props.history} />
      <LogOut history={props.history} />
    </div>
  );
};

export default HomePage;
