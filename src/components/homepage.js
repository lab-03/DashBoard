import React from "react";
import Courses from "./courseslist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HomePage = () => {
  return (
    <div>
      <ToastContainer autoClose={3000} hideProgressBar />
      <h1> This is Homepage </h1>
      <h1> here are the course list</h1>
      <Courses />
    </div>
  );
};

export default HomePage;
