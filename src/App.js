import React from "react";
import Signin from "./components/signin";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/homepage";
import CourseStatPage from "./components/courseStatPage";
import Qr from "./components/qrpage";
function App() {
  return (
    <Switch>
      <Route path="/home/qr/:id" component={Qr} />
      <Route path="/home/course/:id" component={CourseStatPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/" component={Signin} />
    </Switch>
  );
}

export default App;
