import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const Course = (props) => {
  return (
    <Fragment>
      <h1> I am Course {props.id}</h1>
      <Link to={`/home/course/${props.id}`}>here to go to my stat </Link>
      <Link to={`/home/qr/${props.id}`}>here to go to qr </Link>
    </Fragment>
  );
};
export default Course;
