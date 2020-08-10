import React from "react";
import Signin from "./components/signin/signin";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import CourseStatPage from "./components/courseStatPage/courseStatPage";
import QrCode from "./components/QrCode/QrCode";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

import "./App.css";
import "tachyons";

function App() {
  return (
    <Switch>
      <ProtectedRoute
        path="/home/qr/:code/:imageUrl/:hash"
        component={QrCode}
      />
      <ProtectedRoute
        path="/home/course/:name/:code"
        component={CourseStatPage}
      />
      <ProtectedRoute path="/home" component={HomePage} />
      <Route path="/" component={Signin} />
    </Switch>
  );
}

export default App;
