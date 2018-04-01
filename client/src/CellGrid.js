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
        selectedCellValue={props.selectedCellValue}
       />
    ));
    const style = {
        width: props.currentImage.width + 'px',
        height: props.currentImage.height + 'px'
    };
    return (
        <div className='CellGrid--container fadeIn' style={style}>
            {cellGrid}
            {props.viewingFullImage ? 
                <img  className='CellGrid-fullImage' style={style} src={props.currentImage.url} alt="Puzzle Solution" />
                : ''
            }
        </div>
    );
};

CellGrid.propTypes = {
    cells: Proptypes.array.isRequired,
    handleClick: Proptypes.func.isRequired,
    sizeRow: Proptypes.number.isRequired,
    sizeCol: Proptypes.number.isRequired,
    currentImage: Proptypes.object.isRequired,
    viewingFullImage: Proptypes.bool.isRequired,
    selectedCellValue: Proptypes.number
}

export default CellGrid;