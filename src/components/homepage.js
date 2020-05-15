import React from "react";
import Courses from "./courseslist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HomePage = (props) => {
  return (
    <div>
      <ToastContainer autoClose={3000} hideProgressBar />
      {console.log(props.history)}
      <Courses history={props.history} />
    </div>
  );
};

export default HomePage;
