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
        sizeRow={props.sizeRow}
        sizeCol={props.sizeCol}
        currentImage={props.currentImage}
       />
    ));
    const style = {
        width: props.currentImage.width + 'px',
        height: props.currentImage.height + 'px'
    };
    return (
        <div className='CellGrid--container' style={style}>
            {cellGrid}
        </div>
    );
};

CellGrid.propTypes = {
    cells: Proptypes.array.isRequired,
    handleClick: Proptypes.func.isRequired,
    sizeRow: Proptypes.number.isRequired,
    sizeCol: Proptypes.number.isRequired,
    currentImage: Proptypes.object.isRequired
}

export default CellGrid;