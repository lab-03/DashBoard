import React, { Fragment, useEffect, useState } from "react";

import "./QrCode.css";
import DashBoard from "../DashBoard/DashBoard";
import QuestionDialog from "../questionDialog/questionDialog";
import { Button } from "@material-ui/core";
import io from "socket.io-client";
import bottomLeftImage from "./bottomLeft.png";
import LogOut from "../logout/LogOut";

const QrCode = (props) => {
  let { imageUrl, hash } = props.match.params;
  const [state, setState] = useState({
    hide: false,
    openDialog: false,
    attendees: [],
    socket: io("https://gp-verifier.herokuapp.com", {
      autoConnect: false,
    }),
    listening: false,
  });

  useEffect(() => {
    let { listening, socket } = state;
    console.log({ listening });
    if (listening === false) {
      console.log(hash);
      if (!socket.connected) {
        socket
          .on("connect", () => {
            console.log("Socket Connected", socket.id);
            socket.emit("hash", { hash });
          })
          .on("attendees", (attendees) => {
            setState({ ...state, attendees });
          })
          .on(hash, (attendee) => {
            console.log({ socketId: socket.id, hash, attendee });
            setState((prevState) => {
              const attendees = [...prevState.attendees];
              attendees.push(attendee);
              return { ...prevState, attendees };
            });
          })
          .on("disconnect", () => {
            console.log(`disconnected from server`);
            setState((prevState) => {
              const attendees = [...prevState.attendees];
              return { ...prevState, attendees, listening: false };
            });
          });
      }
      socket.connect();
      setState({ ...state, listening: true });
    }
  }, [state, hash]);
  const handleClickOpen = () => {
    setState({ ...state, openDialog: true });
  };
  const handleClose = () => {
    setState((prevState) => {
      const attendees = [...prevState.attendees];
      return { ...prevState, attendees, openDialog: false };
    });
  };

  const onAttendeeAdd = (newAttendee) => {
    if (!newAttendee.name || !newAttendee.id)
      return alert("a name and an id must be provided");
    let socket = io.connect("https://gp-verifier.herokuapp.com");
    socket
      .on("connect", () => {
        console.log("Socket Connected", socket.id);
        socket.emit("add", { hash, newAttendee });
      })
      .on("addition succeeded", (newAttendee) => {
        console.log("addition succeeded", newAttendee.attendee);
        setState((prevState) => {
          const attendees = [...prevState.attendees];
          attendees.push(newAttendee.attendee);
          return { ...prevState, attendees };
        });
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
    fetch(`https://a-tracker.herokuapp.com/sessions/${hash}/add_attendance`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("accessToken"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
        "token-type": localStorage.getItem("tokenType"),
        expiry: localStorage.getItem("expiry"),
      },
      body: JSON.stringify({
        student_id: newAttendee.id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAttendeeUpdate = (updatedAttendee, id) => {
    if (!updatedAttendee.name || !updatedAttendee.id)
      return alert("a name and an id must be provided");

    let oldAttendee = JSON.parse(JSON.stringify(state.attendees[id]));
    delete oldAttendee.tableData;
    let socket = io.connect("https://gp-verifier.herokuapp.com");
    socket
      .on("connect", () => {
        console.log("Socket Connected", socket.id);
      })
      .emit("update", { oldAttendee, updatedAttendee })
      .on("updated", () => {
        console.log(`${{ oldAttendee }} updated to ${{ updatedAttendee }}`);
        setState((prevState) => {
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

  const onAttendeeDelete = (attendee) => {
    let attendeeTemp = JSON.parse(JSON.stringify(attendee));
    delete attendeeTemp.tableData;
    let socket = io.connect("https://gp-verifier.herokuapp.com");
    socket
      .on("connect", () => {
        console.log("Socket Connected", socket.id);
      })
      .emit("delete", { attendeeTemp })
      .on("deleted", () => {
        console.log(attendeeTemp, "deleted");
        setState((prevState) => {
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
    fetch(
      `https://a-tracker.herokuapp.com/sessions/${hash}/invalidate_attendance`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("accessToken"),
          client: localStorage.getItem("client"),
          uid: localStorage.getItem("uid"),
          "token-type": localStorage.getItem("tokenType"),
          expiry: localStorage.getItem("expiry"),
        },
        body: JSON.stringify({
          student_id: attendee.id,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const endQrCode = (hash) => {
    setState((prevState) => {
      const attendees = [...prevState.attendees];
      return { ...prevState, attendees, hide: true };
    });
    fetch(`https://a-tracker.herokuapp.com/sessions/${hash}/end`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("accessToken"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
        "token-type": localStorage.getItem("tokenType"),
        expiry: localStorage.getItem("expiry"),
      },
      body: JSON.stringify({
        hash,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  let { openDialog, hide, attendees } = state;
  return (
    <Fragment>
      <div className="main">
        <LogOut history={props.history} />

        <div className="mt5 flex justify-around">
          <div
            style={{
              width: "100%",
              height: "100vh",
              backgroundColor: "rgb(0,0,0,0.1)",
              marginTop: "-65px",
            }}
          >
            <div
              style={
                !hide
                  ? {
                      marginTop: "10%",
                    }
                  : {
                      marginTop: "5%",
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
                  marginRight: "4.2%",
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
                        textTransform: "none",
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
                          fontSize: "120%",
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
                        textTransform: "none",
                      }}
                    >
                      <p
                        className="pl2 pr2"
                        style={{
                          fontSize: "120%",
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
                height: "100%",
              }}
            >
              <img
                className="center mt5"
                style={{
                  width: "100%",
                  height: "100%",
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
                    textTransform: "none",
                  }}
                >
                  <p
                    className="pl2 pr2"
                    style={{
                      fontSize: "120%",
                    }}
                  >
                    End Session
                  </p>
                </Button>
              </div>
              <span className="ma2"></span>

              <div className="center">
                <Button
                  variant="contained"
                  className="grow shadow"
                  color="primary"
                  onClick={handleClickOpen}
                  style={{
                    background: "#7f7aea",
                    borderRadius: "0px",
                    width: "60%",
                    height: "50px",
                    fontFamily: ["Cairo", "sans-serif"],
                    textTransform: "none",
                  }}
                >
                  <p
                    className="pl2 pr2"
                    style={{
                      fontSize: "120%",
                    }}
                  >
                    Ask a Question
                  </p>
                </Button>
              </div>
            </div>
          ) : null}
        </div>

        <QuestionDialog
          openDialog={openDialog}
          handleClose={handleClose}
          hash={hash}
        />
      </div>
      <div className="Footer">
        <img
          className="bottomLeftImage"
          alt="bottomLeftImage"
          src={bottomLeftImage}
        />
      </div>
    </Fragment>
  );
};

export default QrCode;
