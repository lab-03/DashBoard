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

const Course = ({ id, name, createQrCode }) => {
  const [state] = useState({
    id,
    name,
    hash: crypto.randomBytes(20).toString("hex")
  });
  const { hash } = state;
  return (
    <Fragment>
      <ListItem>
        <ListItemText
          primary={name}
          secondary={id}
          style={{
            color: "#7f7aea",
            fontSize: "80%",
            fontFamily: ["Cairo", "sans-serif"],
            textTransform: "none"
          }}
        />
        <ListItemSecondaryAction>
          <Link to={`/home/course/${id}`} className="link">
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
            onClick={() => createQrCode(id, hash)}
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
