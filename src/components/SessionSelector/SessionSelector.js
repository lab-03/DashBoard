import React, { useState } from "react";
import { InputLabel, FormControl, MenuItem, Select } from "@material-ui/core";

const SessionSelector = ({ setStats, sessions, selected }) => {
  const [state, setState] = useState({
    selected
  });
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };
  const handleChange = event => {
    setStats(sessions, event.target.value);
    setState({ ...state, selected: event.target.value });
  };
  // let { selected } = state;
  return (
    <div>
      <FormControl>
        <InputLabel
          id="sessions"
          style={{
            color: "#7f7aea",
            fontFamily: ["Cairo", "sans-serif"],
            textTransform: "none",
            fontSize: "120%"
          }}
        >
          Session Date.
        </InputLabel>
        <Select
          labelId="sessions"
          value={selected}
          name={selected}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {sessions.map(session => (
            <MenuItem key={session.id} value={session.id.toString()}>
              {"(" + session.number + ") " + session.created_at}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default SessionSelector;
