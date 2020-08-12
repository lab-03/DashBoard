import React, { useState, Fragment, useEffect } from "react";
import "./coursesList.css";
import Course from "../course/course";
import LogOut from "../logout/LogOut";
import {
  List,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  TextField
} from "@material-ui/core";

var axios = require("axios");
const Courses = props => {
  const [state, setState] = useState({
    courses: [],
    longitude: null,
    latitude: null,
    newCourse: {
      name: "",
      id: ""
    },
    checked: false,
    openDialog: false,
    getCourses: true
  });
  const addCourse = async (courseName, courseID) => {
    var courseData = { name: courseName, code: courseID };
    var data = { course: courseData };
    console.log(data);
    var config = {
      method: "post",
      url: "https://a-tracker.herokuapp.com/courses",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("accessToken"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
        "token-type": localStorage.getItem("tokenType"),
        expiry: localStorage.getItem("expiry")
      },
      data: JSON.stringify(data)
    };

    //handleClose();
    console.log(data);
    await axios(config).then(response => {
      console.log("course added successfuly");
      fetch("https://a-tracker.herokuapp.com/courses", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("accessToken"),
          client: localStorage.getItem("client"),
          uid: localStorage.getItem("uid"),
          "token-type": localStorage.getItem("tokenType"),
          expiry: localStorage.getItem("expiry")
        }
      })
        .then(response => response.json())
        .then(response => {
          setState({
            ...state,
            courses: response,
            getCourses: false,
            openDialog: false,
            newCourse: { name: "", id: "" }
          });
          console.log("fetched");
        });
    });
  };
  const getLocation = e => {
    let location = null,
      latitude = null,
      longitude = null;
    if (window.navigator && window.navigator.geolocation) {
      location = window.navigator.geolocation;
    }
    if (location) {
      location.getCurrentPosition(function(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        console.log({ latitude, longitude });
        setState({ ...state, longitude, latitude });
      });
    }
  };

  useEffect(() => {
    let { latitude, longitude, getCourses } = state;
    if (getCourses) {
      fetch("https://a-tracker.herokuapp.com/courses", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("accessToken"),
          client: localStorage.getItem("client"),
          uid: localStorage.getItem("uid"),
          "token-type": localStorage.getItem("tokenType"),
          expiry: localStorage.getItem("expiry")
        }
      })
        .then(response => response.json())
        .then(response => {
          setState({ ...state, courses: response, getCourses: false });
        })
        .catch(err => console.log(err));
    }
    if (!latitude || !longitude) getLocation();
  });
  const createQrCode = id => {
    const { longitude, latitude, checked } = state;
    const { history } = props;

    if ((!latitude || !longitude) && !checked) {
      alert(
        "You must allow access to your location in order to generate a valid QrCode"
      );
    } else {
      fetch("https://a-tracker.herokuapp.com/sessions", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("accessToken"),
          client: localStorage.getItem("client"),
          uid: localStorage.getItem("uid"),
          "token-type": localStorage.getItem("tokenType"),
          expiry: localStorage.getItem("expiry")
        },
        body: JSON.stringify({
          session: {
            classable_id: id,
            classable_type: "Course",
            apply_checks: !checked,
            long: longitude,
            lat: latitude
          }
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        })
        .then(response => {
          let re = new RegExp("/", "g");
          let imageUrl = response.qr_code_base64.replace(re, "%2f");
          let hash = response.token;
          history.push(`/home/qr/${id}/${imageUrl}/${hash}`);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  const handleCheckboxClick = event => {
    setState({ ...state, checked: !checked });
  };
  const handleClickOpen = () => {
    setState({ ...state, openDialog: true });
  };
  const handleClose = () => {
    setState({
      ...state,
      openDialog: false,
      newCourse: { name: "", id: "" }
    });
  };
  const handleSubmit = () => {
    const { courses, newCourse } = state;
    if (!newCourse.name || !newCourse.id) {
      alert("You must enter a course name and a course id");
    } else {
      let check = courses.filter(course => {
        return course.id === newCourse.id;
      });
      if (check.length) {
        alert("There exists a course with the same id");
      } else {
        // let newCourses = courses;
        // newCourses.push(newCourse);
        // setState({
        //   ...state,
        //   courses: newCourses,
        // });
        addCourse(newCourse.name, newCourse.id);
        handleClose();
      }
    }
  };
  const newCourseHandler = e => {
    let target = e.target.name; //name or id to be updated
    let prev = state.newCourse; // prev newCourse
    prev[target] = e.target.value; // update the name or the id depending on which has been updated
    setState({ ...state, newCourse: prev });
  };

  const { openDialog, newCourse, courses, checked } = state;
  return (
    <Fragment>
      <div className="main">
        <div className="flex">
          <div>
            <img className="w-30 mr7" alt="myCourses" src="myCourses.png" />
          </div>
          <div className="headers">
            <LogOut history={props.history} />
            <FormControlLabel
              value="start"
              control={<Checkbox color="primary" />}
              label="Disable extra checks"
              labelPlacement="end"
              style={{
                color: "#7f7aea",
                fontFamily: ["Cairo", "sans-serif"],
                marginLeft: "180px"
              }}
              onChange={handleCheckboxClick}
            />
          </div>
        </div>
        <div className="mw-100">
          <Grid item xs={12} md={11}>
            <div className="ml5">
              <List>
                {courses.map(course => {
                  return (
                    <Course
                      key={course.id}
                      id={course.id}
                      code={course.code}
                      name={course.name}
                      createQrCode={createQrCode}
                    />
                  );
                })}
              </List>
              <Button
                className="shadow grow ma5"
                variant="contained"
                color="primary"
                size="small"
                onClick={handleClickOpen}
                style={{
                  background: "#faa551",
                  borderRadius: "0px",
                  width: "10%",
                  textTransform: "none"
                }}
              >
                <p
                  className=""
                  style={{
                    fontSize: "120%"
                  }}
                >
                  Add Course
                </p>
              </Button>
            </div>
          </Grid>
        </div>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">ADD NEW COURSE</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To Add an new Course please enter the course name and the course
              id.
            </DialogContentText>
            <div>
              <TextField
                autoFocus
                margin="dense"
                label="name"
                name="name"
                type="text"
                value={newCourse.name}
                required
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                onChange={newCourseHandler}
              />
              <TextField
                margin="dense"
                name="id"
                label="id"
                type="text"
                value={newCourse.id}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                required
                onChange={newCourseHandler}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="footer">
        <img
          className="bottomRightImage"
          alt="bottomRight"
          src="bottomRight.png"
        />
      </div>
    </Fragment>
  );
};

export default Courses;
