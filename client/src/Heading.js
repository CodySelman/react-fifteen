import React from 'react';
import Proptypes from 'prop-types';
import './Heading.css';

const Heading = props => {
    return(
        <div className='heading fadeIn'>
            <h1>PixaPuzzler</h1>
            <button>New Game</button>
            <button onClick={props.changeImage}>New Image</button>
        </div>
    );
};

Heading.propTypes = {
    changeImage: Proptypes.func.isRequired
}

export default Heading;