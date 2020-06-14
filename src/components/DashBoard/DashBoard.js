import React from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";

const DashBoard = ({
  attendees,
  onAttendeeAdd,
  onAttendeeUpdate,
  onAttendeeDelete
}) => {
  const [state] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "ID", field: "id", type: "numeric" },
      { title: "FR Score", field: "FRScore", type: "numeric" }
    ],
    listening: false
  });

  return (
    <div className="center">
      <Grid item xs={12} md={9}>
        <MaterialTable
          className="cover"
          title="Attendees"
          columns={state.columns}
          data={attendees}
          editable={{
            onRowAdd: newAttendee =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  onAttendeeAdd(newAttendee);
                }, 600);
              }),
            onRowUpdate: (updatedAttendee, attendees) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  onAttendeeUpdate(updatedAttendee, attendees.tableData.id);
                }, 600);
              }),
            onRowDelete: attendee =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  onAttendeeDelete(attendee);
                }, 600);
              })
          }}
        />
      </Grid>
    </div>
  );
};

export default DashBoard;
