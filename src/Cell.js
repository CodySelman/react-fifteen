import React from 'react';
import './Cell.css';

const Cell = props => {
    return(
        <button className=
                {props.value === 0 ? 
                "Cell--cell Cell--cell-blank" : 
                'Cell--cell'}
                onClick={props.onClick}>
            {props.value}
        </button>
    );
};

export default Cell;