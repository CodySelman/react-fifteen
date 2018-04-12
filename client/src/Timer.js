import React from 'react';
import Proptypes from 'prop-types';
import './Timer.css';

const Timer = props => {
    const width = props.timeRemaining / 60000 * 660;
    const style = {
        width: width + 'px'
    }
    return(
        <div className='timer-container'>
            <div className='timer-background'>
                <div className='timer' style={style}></div>            
            </div>
        </div>
        
    )
}

Timer.propTypes = {
    timeRemaining: Proptypes.number.isRequired
}

export default Timer;