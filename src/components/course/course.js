import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import crypto from "crypto";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Button,
  Divider
} from "@material-ui/core";

const Course = ({ code, title, createQrCode }) => {
  const [state] = useState({
    code,
    title,
    hash: crypto.randomBytes(20).toString("hex")
  });
  const { hash } = state;
  return (
    <Fragment>
      <ListItem>
        <ListItemText primary={title} secondary={code} />
        <ListItemSecondaryAction>
          <Link to={`/home/course/${code}`} className="link">
            <Button
              className="shadow grow"
              variant="contained"
              color="primary"
              size="small"
            >
              <p className="fw7-ns">Statistics</p>
            </Button>
          </Link>
          <span className="ma2"></span>

          <Button
            className="shadow grow"
            variant="contained"
            color="primary"
            size="small"
            onClick={() => createQrCode(code, hash)}
          >
            <p className="fw7-ns">GenerateQrCode</p>
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );
};
export default Course;
