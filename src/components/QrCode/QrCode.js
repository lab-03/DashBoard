import React, { Fragment } from "react";
import "./QrCode.css";
import DashBoard from "../DashBoard/DashBoard";
import { Button } from "@material-ui/core";

const QrCode = props => {
  let { imageUrl, hash } = props.match.params;
  console.log(props.match.params);
  console.log({ imageUrl, hash });
  const [state, setState] = React.useState({
    imageUrl,
    hash,
    hide: false
  });
  const endQrCode = hash => {
    fetch("http://localhost:5000/api/qrcodes/end", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hash
      })
    })
      .then(response => response.json())
      .then(response => {
        setState({ hide: true });
      })
      .catch(err => console.log(err));
  };

  const { hide } = state;
  return (
    <div>
      {!hide ? (
        <Fragment>
          <div className="center ma">
            <img
              id="inputimage"
              alt="QrCode"
              src={imageUrl}
              width="500px"
              height="auto"
            />
          </div>
          <div className="center ma3">
            <Button
              variant="contained"
              className="grow shadow"
              color="primary"
              onClick={() => endQrCode(hash)}
            >
              End Session
            </Button>
          </div>
        </Fragment>
      ) : null}
      <div>
        <DashBoard />
      </div>
      {hide ? (
        <div className="center ma3 flex justify-around">
          <div>
            <Button
              variant="contained"
              className="grow shadow"
              color="primary"
              onClick={() => {}}
            >
              Submit and Create Quiz
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              className="grow shadow"
              color="primary"
              onClick={() => {}}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QrCode;
