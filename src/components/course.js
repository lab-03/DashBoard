import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import crypto from "crypto";
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Button,
  Divider
} from "@material-ui/core";

const Course = ({ id, title }) => {
  const [state, setState] = React.useState({
    imageUrl: "",
    hash: crypto.randomBytes(20).toString("hex")
  });
  const createQrCode = () => {
    const { hash } = state;
    // let { longitude, latitude } = this.state;
    // if (longitude === null || latitude === null) {
    //   alert(
    //     "You must allow access to your location in order to generate a valid QrCode"
    //   );
    // } else {
    fetch("http://localhost:5000/api/qrcodes/create", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hash,
        longitude: "30.2262612",
        latitude: "80.2262612"
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setState({ ...state, imageUrl: response.data });
      })
      .catch(err => console.log(err));
    // }
  };
  const { hash, imageUrl } = state;

  return (
    <Fragment>
      <ListItem>
        <ListItemText primary={title} secondary={id} />
        <ListItemSecondaryAction>
          <Link to={`/home/course/${id}`}>
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
          <Link to={`/home/qr/${id}/${imageUrl}/${hash}`}>
            {console.log({ hash, imageUrl })}
            <Button
              className="shadow grow"
              variant="contained"
              color="primary"
              size="small"
              onClick={createQrCode}
            >
              <p className="fw7-ns">GenerateQrCode</p>
            </Button>
          </Link>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Fragment>
  );
};
export default Course;
