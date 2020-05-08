import React from "react";

const Qr = (props) => {
  return (
    <div>
      {console.log(props.match.params)}
      <h1>this is qr page of course {props.match.params.id} </h1>
    </div>
  );
};

export default Qr;
