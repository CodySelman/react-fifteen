import React from 'react';
import Proptypes from 'prop-types';
import './Heading.css';
import Timer from './Timer';

const Heading = props => {
    return(
        <div className='heading fadeIn'>
            <h1>mix-img</h1>
            <div>
                <button onClick={props.newGame}>New Game</button>
                <p>Score: {props.score}</p>
            </div>
            <Timer timeRemaining={props.timeRemaining}/>
        </div>
    );
};

Heading.propTypes = {
    changeImage: Proptypes.func.isRequired,
    score: Proptypes.number.isRequired,
    newGame: Proptypes.func.isRequired,
    timeRemaining: Proptypes.number.isRequired
}

export default Heading;