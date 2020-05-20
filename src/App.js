import React from "react";
import Signin from "./components/signin/signin";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import CourseStatPage from "./components/courseStatPage/courseStatPage";
import QrCode from "./components/QrCode/QrCode";
import "./App.css";
import "tachyons";

function App() {
  return (
    <Switch>
      <Route path="/home/qr/:code/:imageUrl/:hash" component={QrCode} />
      <Route path="/home/course/:code" component={CourseStatPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/" component={Signin} />
    </Switch>
  );
}

export default App;
