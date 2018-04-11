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
        handleKeyPress={props.handleKeyPress}
        isSwapping={props.isSwapping}
       />
    ));
    return (
        <div className='CellGrid--container fadeIn' onKeyDown={e=>props.handleKeyPress(e)}>
            {cellGrid}
            {props.viewingFullImage ? 
                <img  className='CellGrid-fullImage' src={props.currentImage.url} alt="Puzzle Solution" />
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
    selectedCellValue: Proptypes.number,
    handleKeyPress: Proptypes.func.isRequired,
    isSwapping: Proptypes.bool.isRequired
}

export default CellGrid;