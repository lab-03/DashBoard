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

const Course = ({ id, title, history }) => {
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

        // let find = "//";
        // let re = new RegExp(find);
        // response.data = response.data.replace(re, "%2f");
        let x = "";
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i] === "/") x += "%2f";
          else x += response.data[i];
        }

        console.log({ imgUrl: response.data, hash });
        history.push(`/home/qr/${id}/${x}/${hash}`);
      })
      .catch(err => {
        console.log(err);
        history.push(`/home/qr/${id}/henaelurl/${hash}`);
      });
    // }
  };

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

          <Button
            className="shadow grow"
            variant="contained"
            color="primary"
            size="small"
            onClick={createQrCode}
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
