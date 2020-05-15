import React, { Fragment } from "react";
import Signin from "./components/signin";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/homepage";
import CourseStatPage from "./components/courseStatPage";
import QrCode from "./components/QrCode";
import "./App.css";
import "tachyons";

function App() {
  const [state, setState] = React.useState({
    course: {
      title: "",
      id: "",
      imageUrl: "",
      hash: ""
    }
  });
  const handleCourseChange = course => {
    setState(course);
  };
  const { course } = state;
  return (
    <Switch>
      <Route
        path="/home/qr/:id/:imageUrl/:hash"
        imageUrl={course.imageUrl}
        hash={course.hash}
        component={QrCode}
      />
      <Route path="/home/course/:id" component={CourseStatPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/" component={Signin} />
    </Switch>
  );
}

export default App;
