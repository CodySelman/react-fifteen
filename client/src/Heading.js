import React from 'react';
import './Heading.css';

const Heading = props => {
    return(
        <div className='heading fadeIn'>
            <h1>PixaPuzzler</h1>
            <button>New Game</button>
            <button>New Image</button>
        </div>
    );
};

export default Heading;