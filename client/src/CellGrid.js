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
    return (
        <div className='CellGrid--container fadeIn'>
            {cellGrid}
            {props.viewingFullImage ? 
                <img  className='CellGrid-fullImage' src={props.currentImage.url} alt="Puzzle Solution" />
                : ''
            }
            {props.gameOver ?
                <div className='gameOver fadeIn'>
                    <p>Game Over</p>
                </div>
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
    gameOver: Proptypes.bool.isRequired
}

export default CellGrid;