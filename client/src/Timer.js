import React from 'react';
import Proptypes from 'prop-types';
import './Timer.css';

const Timer = props => {
    const barColors = [
        'rgb(75,75,75)',
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'indigo',
        'violet'
    ]
    const width = (props.timeRemaining % 30000) / 30000 * 660;
    const numberOfBars = Math.floor(props.timeRemaining / 30000)
    const barStyle0 = {
        width: numberOfBars > 0 ? 660 : width,
        backgroundColor: barColors[0]
    }
    const barStyle1 = {
        width: numberOfBars > 1 ? 660 : numberOfBars === 1 ? width : 0,
        backgroundColor: barColors[1]
    };
    const barStyle2 = {
        width: numberOfBars > 2 ? 660 : numberOfBars === 2 ? width : 0,
        backgroundColor: barColors[2]        
    }
    const barStyle3 = {
        width: numberOfBars > 2 ? 660 : numberOfBars === 3 ? width : 0,
        backgroundColor: barColors[3]        
    }
    const barStyle4 = {
        width: numberOfBars > 2 ? 660 : numberOfBars === 4 ? width : 0,
        backgroundColor: barColors[4]        
    }
    const barStyle5 = {
        width: numberOfBars > 2 ? 660 : numberOfBars === 5 ? width : 0,
        backgroundColor: barColors[5]        
    }
    const barStyle6 = {
        width: numberOfBars > 2 ? 660 : numberOfBars === 6 ? width : 0,
        backgroundColor: barColors[6]        
    }
    const barStyle7 = {
        width: numberOfBars > 2 ? 660 : numberOfBars === 7 ? width : 0,
        backgroundColor: barColors[7]        
    }

    return(
        <div className='timer-container'>
            <div className='timer-background'>
            <div className='timer' style={barStyle0}></div>   
            <div className='timer' style={barStyle1}></div>   
            <div className='timer' style={barStyle2}></div>   
            <div className='timer' style={barStyle3}></div>   
            <div className='timer' style={barStyle4}></div>   
            <div className='timer' style={barStyle5}></div>   
            <div className='timer' style={barStyle6}></div>   
            <div className='timer' style={barStyle7}></div>   
            </div>
        </div>
        
    )
}

Timer.propTypes = {
    timeRemaining: Proptypes.number.isRequired
}

export default Timer;