import React from 'react';
import './Cell.css';

const Cell = props => {
    return(
        <button className={"Cell--cell"} 
            onClick={props.onClick}>{props.value}
        </button>
    );
};

export default Cell;