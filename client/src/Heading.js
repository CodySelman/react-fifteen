import React from 'react';
import Proptypes from 'prop-types';
import './Heading.css';

const Heading = props => {
    return(
        <div className='heading fadeIn'>
            <h1>PixaPuzzler</h1>
            <button>New Game</button>
            <button onClick={props.changeImage}>New Image</button>
            <p>Score: {props.score}</p>
        </div>
    );
};

Heading.propTypes = {
    changeImage: Proptypes.func.isRequired,
    score: Proptypes.number.isRequired
}

export default Heading;