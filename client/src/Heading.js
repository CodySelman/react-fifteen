import React from 'react';
import Proptypes from 'prop-types';
import './Heading.css';

const Heading = props => {
    return(
        <div className='heading fadeIn'>
            <h1>mix.img</h1>
            <div>
                <p>Score: {props.score}</p>
                <button onClick={props.newGame}>New Game</button>
            </div>
        </div>
    );
};

Heading.propTypes = {
    changeImage: Proptypes.func.isRequired,
    score: Proptypes.number.isRequired,
    newGame: Proptypes.func.isRequired
}

export default Heading;