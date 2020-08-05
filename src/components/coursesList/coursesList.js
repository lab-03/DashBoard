import React, { useState, useEffect } from "react";
import "./coursesList.css";
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
  Checkbox,
  FormControlLabel,
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
    checked: false,
    openDialog: false
  });
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
    let { latitude, longitude } = state;
    if (!latitude || !longitude) getLocation();
  });

  const createQrCode = (code, hash) => {
    const { longitude, latitude, checked } = state;
    const { history } = props;
    console.log({ longitude, latitude });

    if ((!latitude || !longitude) && !checked) {
      alert(
        "You must allow access to your location in order to generate a valid QrCode"
      );
    } else {
      fetch("https://gp-verifier.herokuapp.com/api/qrcodes/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          hash,
          applyChecks: !checked,
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
          history.push(`/home/qr/${code}/${imageUrl}/${hash}`);
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
      newCourse: { title: "", code: "" }
    });
  };
  const handleSubmit = () => {
    const { courses, newCourse } = state;
    if (!newCourse.title || !newCourse.code) {
      alert("You must enter a course title and a course code");
    } else {
      let check = courses.filter(course => {
        return course.code === newCourse.code;
      });
      if (check.length) {
        alert("There exists a course with the same code");
      } else {
        let newCourses = courses;
        newCourses.push(newCourse);
        setState({
          ...state,
          courses: newCourses
        });
        handleClose();
      }
    }
  };
  const newCourseHandler = e => {
    let target = e.target.name; //title or code to be updated
    let prev = state.newCourse; // prev newCourse
    prev[target] = e.target.value; // update the title or the code depending on which has been updated
    setState({ ...state, newCourse: prev });
  };

  const { openDialog, newCourse, courses, checked } = state;

  return (
    <div>
      <div className="flex">
        <div>
          <img className="w-30 mr7" alt="myCourses" src="myCoruses.png" />
        </div>
        <div>
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <div className="flex justify-end">
        <img
          className="bottomRightImage"
          alt="bottomRight"
          src="bottomRight.png"
        />
      </div>
    </div>
  );
};

export default Courses;
