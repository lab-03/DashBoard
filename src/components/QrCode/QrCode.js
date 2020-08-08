import React, { Fragment, useEffect } from "react";
import "./QrCode.css";
import DashBoard from "../DashBoard/DashBoard";
import { Button } from "@material-ui/core";
import socketIO from "socket.io-client";
import LogOut from "../logout/LogOut";

const QrCode = (props) => {
  let { imageUrl, hash } = props.match.params;
  const [state, setState] = React.useState({
    hide: false,
    attendees: [],
    socket: socketIO.connect("http://localhost:8888", { autoConnect: false }),
    listening: false,
  });

  useEffect(() => {
    let { listening, socket } = state;
    console.log(listening);
    if (listening === false) {
      console.log(hash);
      socket.connect();
      socket
        .on("connect", () => {
          console.log("Socket Connected", socket.id);
          socket.emit("hash", { hash });
        })
        .on("attendees", (attendees) => {
          setState({ ...state, attendees });
        })
        .on(hash, (newAttendee) => {
          console.log({ hash, newAttendee });
          setState((prevState) => {
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

  const onAttendeeAdd = (newAttendee) => {
    if (!newAttendee.name || !newAttendee.id)
      return alert("a name and an id must be provided");
    let socket = socketIO.connect("http://localhost:8888");
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
    let socket = socketIO.connect("http://localhost:8888");
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
    let socket = socketIO.connect("http://localhost:8888");
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
  };

  const endQrCode = (hash) => {
    fetch("http://localhost:8888/api/qrcodes/end", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hash,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setState({ ...state, hide: true });
      })
      .catch((err) => console.log(err));
  };
  let { hide, attendees } = state;
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
        <DashBoard
          attendees={attendees}
          onAttendeeAdd={onAttendeeAdd}
          onAttendeeUpdate={onAttendeeUpdate}
          onAttendeeDelete={onAttendeeDelete}
        />
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
              onClick={() => {
                let { socket } = state;
                console.log(`disconnecting socket ${socket.id}`);
                socket.disconnect();
                setState({ ...state, listening: -1 });
                return props.history.push("/home");
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : null}
      <LogOut history={props.history} />
    </div>
  );
};

export default QrCode;
