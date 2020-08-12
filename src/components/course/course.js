import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Button,
  Divider
} from "@material-ui/core";

const Course = ({ id, name, createQrCode, code }) => {
  return (
    <Fragment>
      <ListItem>
        <ListItemText
          primary={name}
          secondary={code}
          style={{
            color: "#7f7aea",
            fontSize: "80%",
            fontFamily: ["Cairo", "sans-serif"],
            textTransform: "none"
          }}
        />
        <ListItemSecondaryAction>
          <Link to={`/home/course/${name}/${id}`} className="link">
            <Button
              className="shadow grow"
              color="primary"
              variant="contained"
              size="small"
              style={{
                background: "#7f7aea",
                borderRadius: "0px",
                width: "120px",
                fontFamily: ["Cairo", "sans-serif"],
                textTransform: "none"
              }}
            >
              <p
                className="pl2 pr2"
                style={{
                  fontSize: "120%"
                }}
              >
                Statistics
              </p>
            </Button>
          </Link>
          <span className="ma2"></span>

          <Button
            className="shadow grow"
            variant="contained"
            color="primary"
            size="small"
            style={{
              background: "#7f7aea",
              borderRadius: "0px",
              width: "120px",
              fontFamily: ["Cairo", "sans-serif"],
              textTransform: "none"
            }}
            onClick={() => createQrCode(id)}
          >
            <p
              className="pl2 pr2"
              style={{
                fontSize: "120%"
              }}
            >
              QR CODE
            </p>
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <div className="mt1"></div>
      <Divider />
      <div className="mt1"></div>
    </Fragment>
  );
};
export default Course;
