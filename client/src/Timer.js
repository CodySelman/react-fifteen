import React from 'react';
import Proptypes from 'prop-types';
import './Timer.css';

const Timer = () => {
    return(
        <div>
            hello
        </div>
    )
}

Timer.propTypes = {
    timeRemaining: Proptypes.number.isRequired
}

export default Timer;