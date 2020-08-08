import React from "react";
import LogOut from "../logout/LogOut";
const Stat = (props) => {
  return (
    <div>
      <h1> this state of course {props.match.params.id} </h1>;
      <LogOut history={props.history} />
    </div>
  );
};
export default Stat;
