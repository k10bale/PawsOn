import React from "react";
import "./style.css";

function PetCard(props) {
  return (
    <div className="card">
      {/* <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div> */}
      <div className="content">
        <ul>
          <li>
            <strong>Name:</strong> {props.petName}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PetCard;
