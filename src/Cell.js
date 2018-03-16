import React from 'react';
import Proptypes from 'prop-types';
import './Cell.css';

const Cell = props => {
    const size = (100 - props.gridSize) / props.gridSize;
    const style = {
        width: size,
        height: size
    }
    const blankCellValue = Math.pow(props.gridSize, 2);
    return(
        <button className=
                {props.value === blankCellValue ? 
                "Cell--cell Cell--cell-blank" : 
                'Cell--cell'}
                onClick={props.onClick}
                style={style}>
            {props.value === blankCellValue ? '' : props.value}
        </button>
    );
};

Cell.Proptypes = {
    value: Proptypes.number.isRequired,
    onClick: Proptypes.func.isRequired,
    gridSize: Proptypes.number.isRequired
}

export default Cell;