import React from 'react';
import Proptypes from 'prop-types';
import Cell from './Cell.js';
import './CellGrid.css';

const CellGrid = props => {
    const cellGrid = props.cells.map((cell, index) => (
       <Cell 
        key={index}
        value={cell.value}
        onClick={() => props.handleClick(index)}
        gridSize={props.gridSize}
        sizeRow={props.sizeRow}
        sizeCol={props.sizeCol}
       />
    ));
    return (
        <div className='CellGrid--container'>
            {cellGrid}
        </div>
    );
};

CellGrid.propTypes = {
    cells: Proptypes.array.isRequired,
    handleClick: Proptypes.func.isRequired,
    gridSize: Proptypes.number.isRequired,
    sizeRow: Proptypes.number.isRequired,
    sizeCol: Proptypes.number.isRequired
}

export default CellGrid;