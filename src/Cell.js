import React from 'react';
import './Cell.css';

const Cell = props => {
    const size = (100 - props.gridSize) / props.gridSize;
    const style = {
        width: size,
        height: size
    }
    const blankCell = Math.pow(props.gridSize, 2);
    return(
        <button className=
                {props.value === blankCell ? 
                "Cell--cell Cell--cell-blank" : 
                'Cell--cell'}
                onClick={props.onClick}
                style={style}>
            {props.value === blankCell ? '' : props.value}
        </button>
    );
};

export default Cell;