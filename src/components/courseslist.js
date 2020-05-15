import React from "react";
import Course from "./course";
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

const Courses = () => {
  const [state, setState] = React.useState({
    courses: [
      {
        title: "Introduction to CS",
        id: "CS-123"
      },
      {
        title: "ML",
        id: "CS-255"
      },
      {
        title: "OOP",
        id: "CS-124"
      }
    ],
    newCourse: {
      title: "",
      id: ""
    },
    openDialog: false
  });
  const handleClickOpen = () => {
    setState({ ...state, openDialog: true });
  };
  const handleClose = () => {
    setState({ ...state, openDialog: false });
    setState({ ...state, newCourse: { title: "", id: "" } });
    console.log(state);
  };
  const handleSubmit = () => {
    handleClose();
    const { courses, newCourse } = state;
    let newCourses = courses;
    newCourses.push(newCourse);
    setState({ ...state, courses: newCourses });
    setState({ ...state, newCourse: { title: "", id: "" } });
  };
  const onChange = (key, value) => {
    let newCourse = state.newCourse;
    newCourse[key] = value;
    console.log(newCourse);
    setState({ ...state, newCourse });
  };
  const { openDialog } = state;
  return (
    <div className="center">
      <Grid item xs={12} md={9}>
        <h3 variant="h6">My Courses</h3>
        <div>
          <List>
            <Course id={1} title={"OOP"} />
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
              value="ay haga"
              required
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              onChange={event => {
                onChange("title", event.target.value);
              }}
            />
            <TextField
              margin="dense"
              name="id"
              label="ID"
              type="text"
              value="ay haga"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              required
              onChange={event => {
                onChange("id", event.target.value);
              }}
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
