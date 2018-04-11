import React from 'react';
import Proptypes from 'prop-types';
import './Timer.css';

const Timer = props => {
    const width = props.timeRemaining / 6000 * 100;
    const style = {
        width: width + '%'
    }
    return(
        <div className='timer' style={style}></div>
    )
}

Timer.propTypes = {
    timeRemaining: Proptypes.number.isRequired
}

export default Timer;