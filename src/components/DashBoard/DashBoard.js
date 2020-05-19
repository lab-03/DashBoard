import React from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";

export default function DashBoard() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "ID", field: "ID", type: "numeric" },
      { title: "FR Score", field: "FRScore", type: "numeric" }
    ],
    data: [
      { name: "Test", ID: "20160001", FRScore: 82 },
      {
        name: "Potato",
        ID: "20160002",
        FRScore: 82
      }
    ]
  });

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
}
