import React from 'react';
import './Cell.css';

const Cell = props => {
    const size = (100 - props.gridSize) / props.gridSize;
    const style = {
        width: size,
        height: size
    }
    return(
        <button className=
                {props.value === 16 ? 
                "Cell--cell Cell--cell-blank" : 
                'Cell--cell'}
                onClick={props.onClick}
                style={style}>
            {props.value === 16 ? '' : props.value}
        </button>
    );
};

export default Cell;