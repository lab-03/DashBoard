import React, { Fragment, useEffect } from "react";

import "./QrCode.css";
import DashBoard from "../DashBoard/DashBoard";
import QuestionDialog from "../questionDialog/questionDialog";
import { Button } from "@material-ui/core";
import socketIO from "socket.io-client";
import bottomLeftImage from "./bottomLeft.png";

const QrCode = props => {
  let { imageUrl, hash } = props.match.params;
  const [state, setState] = React.useState({
    hide: false,
    openDialog: false,
    attendees: [],
    socket: socketIO.connect("https://gp-verifier.herokuapp.com", {
      autoConnect: false
    }),
    listening: false
  });

  useEffect(() => {
    let { listening, socket } = state;
    console.log({ listening });
    if (listening === false) {
      console.log(hash);
      socket.connect();
      socket
        .on("connect", () => {
          console.log("Socket Connected", socket.id);
          socket.emit("hash", { hash });
        })
        .on("attendees", attendees => {
          setState({ ...state, attendees });
        })
        .on(hash, newAttendee => {
          console.log({ hash, newAttendee });
          setState(prevState => {
            const attendees = [...prevState.attendees];
            attendees.push(newAttendee);
            return { ...prevState, attendees };
          });
        })
        .on("disconnect", () => {
          console.log(`disconnected from server`);
          setState({ ...state, listening: false });
        });
      setState({ ...state, listening: true });
    }
  }, [state, hash]);
  const handleClickOpen = () => {
    setState({ ...state, openDialog: true });
  };
  const handleClose = () => {
    setState({ ...state, openDialog: false });
  };
  const handleSubmit = question => {
    console.log(question);
    handleClose();
  };

  const onAttendeeAdd = newAttendee => {
    if (!newAttendee.name || !newAttendee.id)
      return alert("a name and an id must be provided");
    let socket = socketIO.connect("https://gp-verifier.herokuapp.com");
    socket
      .on("connect", () => {
        console.log("Socket Connected", socket.id);
        socket.emit("add", { hash, newAttendee });
      })
      .on("adding", () => {
        console.log(`disconnecting socket ${socket.id}`);
        socket.disconnect();
      })
      .on("addition failed", () => {
        console.log(`addition failed disconnecting socket ${socket.id}`);
        socket.disconnect();
        alert(
          "addition failed, A student with the same id was already recorded"
        );
      })
      .on("disconnect", () => {
        console.log("socket disconnected");
      });
  };

  const onAttendeeUpdate = (updatedAttendee, id) => {
    if (!updatedAttendee.name || !updatedAttendee.id)
      return alert("a name and an id must be provided");

    let oldAttendee = JSON.parse(JSON.stringify(state.attendees[id]));
    delete oldAttendee.tableData;
    let socket = socketIO.connect("https://gp-verifier.herokuapp.com");
    socket
      .on("connect", () => {
        console.log("Socket Connected", socket.id);
      })
      .emit("update", { oldAttendee, updatedAttendee })
      .on("updated", () => {
        console.log(`${{ oldAttendee }} updated to ${{ updatedAttendee }}`);
        setState(prevState => {
          const attendees = [...prevState.attendees];
          console.log(attendees);
          attendees[id] = updatedAttendee;
          return { ...prevState, attendees };
        });
        socket.disconnect();
      })
      .on("update failed", () => {
        console.log(`disconnecting socket ${socket.id}`);
        socket.disconnect();
        alert("update failed please try again!");
      })
      .on("disconnect", () => {
        console.log("socket disconnected");
      });
  };

  const onAttendeeDelete = attendee => {
    let attendeeTemp = JSON.parse(JSON.stringify(attendee));
    delete attendeeTemp.tableData;
    let socket = socketIO.connect("https://gp-verifier.herokuapp.com");
    socket
      .on("connect", () => {
        console.log("Socket Connected", socket.id);
      })
      .emit("delete", { attendeeTemp })
      .on("deleted", () => {
        console.log(attendeeTemp, "deleted");
        setState(prevState => {
          const attendees = [...prevState.attendees];
          attendees.splice(attendees.indexOf(attendee), 1);
          return { ...prevState, attendees };
        });
        console.log(`disconnecting socket ${socket.id}`);
        socket.disconnect();
      })
      .on("deletion error", () => {
        socket.disconnect();
        alert("deletion failed please try again!");
      })
      .on("disconnect", () => {
        console.log("socket disconnected");
      });
  };

  const endQrCode = hash => {
    fetch("https://gp-verifier.herokuapp.com/api/qrcodes/end", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hash
      })
    })
      .then(response => response.json())
      .then(response => {
        setState({ ...state, hide: true });
      })
      .catch(err => console.log(err));
  };
  let { openDialog, hide, attendees } = state;
  return (
    <Fragment>
      <div className="mt5 flex justify-around">
        <div
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "rgb(0,0,0,0.1)",
            marginTop: "-65px"
          }}
        >
          <div
            style={
              !hide
                ? {
                    marginTop: "10%"
                  }
                : {
                    marginTop: "5%"
                  }
            }
          >
            <DashBoard
              attendees={attendees}
              onAttendeeAdd={onAttendeeAdd}
              onAttendeeUpdate={onAttendeeUpdate}
              onAttendeeDelete={onAttendeeDelete}
            />
          </div>
          {hide ? (
            <div
              style={{
                marginRight: "4.2%"
              }}
            >
              <div className="center ma3 flex justify-end">
                <div>
                  <Button
                    variant="contained"
                    className="grow shadow"
                    color="primary"
                    style={{
                      background: "#faa551",
                      borderRadius: "0px",
                      width: "180px",
                      height: "50px",
                      fontFamily: ["Cairo", "sans-serif"],
                      textTransform: "none"
                    }}
                    onClick={() => {
                      let { socket } = state;
                      console.log(`disconnecting socket ${socket.id}`);
                      socket.disconnect();
                      setState({ ...state, listening: -1 });
                      return props.history.push("/home");
                    }}
                  >
                    <p
                      className="pl2 pr2"
                      style={{
                        fontSize: "120%"
                      }}
                    >
                      Submit
                    </p>
                  </Button>
                </div>
                <span className="ma2"></span>
                <div>
                  <Button
                    variant="contained"
                    className="grow shadow"
                    color="primary"
                    onClick={handleClickOpen}
                    style={{
                      background: "#7f7aea",
                      borderRadius: "0px",
                      width: "180px",
                      height: "50px",
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
                      Ask a Question
                    </p>
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {!hide ? (
          <div
            style={{
              width: "30%",
              height: "100%"
            }}
          >
            <img
              className="center mt5"
              style={{
                width: "100%",
                height: "100%"
              }}
              id="inputimage"
              alt="QrCode"
              src={imageUrl}
            />
            <div className="center">
              <Button
                variant="contained"
                className="grow shadow"
                color="primary"
                onClick={() => endQrCode(hash)}
                style={{
                  background: "#faa551",
                  borderRadius: "0px",
                  width: "60%",
                  height: "50px",
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
                  End Session
                </p>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <img
          className="bottomLeftImage"
          alt="bottomLeftImage"
          src={bottomLeftImage}
        />
      </div>
      <QuestionDialog
        openDialog={openDialog}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default QrCode;
