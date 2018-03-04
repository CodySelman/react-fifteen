import React from 'react';
import './Cell.css';

const Cell = props => {
    return(
        <button className={props.index === 0 ? 'Cell--cell-blank Cell--cell' : "Cell--cell"} 
            onClick={props.onClick}>{props.value}
        </button>
    );
};

export default Cell;