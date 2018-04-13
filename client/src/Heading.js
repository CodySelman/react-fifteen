import React from "react";
import Proptypes from "prop-types";
import "./Heading.css";
import Timer from "./Timer";

const Heading = props => {
  return (
    <div>
      <div className="heading fadeIn">
        <h1>mix-img</h1>
        <div>
          <button onClick={props.initializeState}>New Game</button>
          <p>Score: {props.score}</p>
        </div>
      </div>
      <div className="timer-container fadeIn">
        <Timer timeRemaining={props.timeRemaining} />
      </div>
    </div>
  );
};

Heading.propTypes = {
  changeImage: Proptypes.func.isRequired,
  score: Proptypes.number.isRequired,
  initializeState: Proptypes.func.isRequired,
  timeRemaining: Proptypes.number.isRequired
};

export default Heading;
