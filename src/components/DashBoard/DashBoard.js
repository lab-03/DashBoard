import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";
import socketIO from "socket.io-client";

const DashBoard = ({ hash }) => {
  const [state, setState] = React.useState({
    hash,
    columns: [
      { title: "Name", field: "name" },
      { title: "ID", field: "id", type: "numeric" },
      { title: "FR Score", field: "FRScore", type: "numeric" }
    ],
    data: [],
    listening: false
  });
  useEffect(() => {
    let { listening } = state;
    if (listening === false) {
      let socket = socketIO.connect("http://localhost:8888");
      socket
        .on("connect", () => {
          console.log("Socket Connected");
          console.log(socket.id);
        })
        .on(hash, newAttendee => {
          console.log({ hash, newAttendee });
          setState(prevState => {
            const data = [...prevState.data];
            data.push(newAttendee);
            return { ...prevState, data };
          });
        })
        .on("disconnect", () => {
          // if (msg === "disconnecting") {
          console.log("server disconnected");
          setState({ ...state, listening: -1 });
          // }
        });
      setState({ ...state, listening: true });
    }
  }, [state, hash]);
  return (
    <div className="center">
      <Grid item xs={12} md={9}>
        <MaterialTable
          className="cover"
          title="Attendees"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setState(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState(prevState => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              })
          }}
        />
      </Grid>
    </div>
  );
};

export default DashBoard;
