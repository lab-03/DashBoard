import React, { useState, useEffect } from "react";
import Course from "../course/course";
import {
  List,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";

const Courses = props => {
  const [state, setState] = useState({
    courses: [
      {
        title: "Introduction to CS",
        code: "CS-123"
      },
      {
        title: "ML",
        code: "CS-255"
      },
      {
        title: "OOP",
        code: "CS-124"
      }
    ],
    longitude: null,
    latitude: null,
    newCourse: {
      title: "",
      code: ""
    },
    openDialog: false
  });
  const getMyLocation = e => {
    let location = null,
      latitude = null,
      longitude = null;
    if (window.navigator && window.navigator.geolocation) {
      location = window.navigator.geolocation;
    }
    if (location) {
      location.getCurrentPosition(function(position) {
        longitude = position.coords.longitude.toFixed(7);
        latitude = position.coords.latitude.toFixed(7);
        setState({ ...state, longitude, latitude });
      });
    }
  };
  useEffect(() => {
    let { latitude, longitude } = state;
    if (!latitude || !longitude) getMyLocation();
  });

  const createQrCode = (code, hash) => {
    const { longitude, latitude } = state;
    const { history } = props;
    console.log({ longitude, latitude });

    if (!latitude || !longitude) {
      alert(
        "You must allow access to your location in order to generate a valid QrCode"
      );
    } else {
      fetch("http://localhost:8888/api/qrcodes/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          hash,
          longitude,
          latitude
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
          let imageUrl = response.data.replace(re, "%2f");

          console.log({ imgUrl: response.data, hash });
          history.push(`/home/qr/${code}/${imageUrl}/${hash}`);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleClickOpen = () => {
    setState({ ...state, openDialog: true });
  };
  const handleClose = () => {
    setState({ ...state, openDialog: false });
  };
  const handleSubmit = () => {
    const { courses, newCourse } = state;
    let newCourses = courses;
    newCourses.push(newCourse);
    setState({ ...state, courses: newCourses });
    setState({ ...state, newCourse: { title: "", code: "" } });
    handleClose();
  };
  const newCourseHandler = e => {
    let target = e.target.name;
    const prev = state.newCourse;
    prev[target] = e.target.value;
    const updated = { ...state, newCourse: prev };
    setState(updated);
  };

  const { openDialog, newCourse, courses } = state;

  return (
    <div className="center">
      <Grid item xs={12} md={9}>
        <h3 variant="h6">My Courses</h3>
        <div>
          <List>
            {courses.map(course => (
              <Course
                key={course.code}
                code={course.code}
                title={course.title}
                createQrCode={createQrCode}
              />
            ))}
          </List>
          <Button
            className="shadow grow ma5"
            variant="contained"
            color="primary"
            size="small"
            onClick={handleClickOpen}
          >
            <p className="fw7-ns">Add New Course</p>
          </Button>
        </div>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ADD NEW COURSE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add an new Course please enter the course Title and the course
            ID.
          </DialogContentText>
          <div>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              name="title"
              type="text"
              value={newCourse.title}
              required
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              onChange={newCourseHandler}
            />
            <TextField
              margin="dense"
              name="code"
              label="code"
              type="text"
              value={newCourse.code}
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
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Courses;
