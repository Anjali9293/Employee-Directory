import React from "react";

function Card(props) {
  return (
    <div className="card text-center">
      <div className="card-header"style={{backgroundColor: "beige"}}>
        <h2>{props.heading}</h2>
      </div>
      <div className="card-body" style={{backgroundColor: "coral"}} >{props.children}</div>
    </div>
  );
}

export default Card;
