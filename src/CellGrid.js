import React from 'react';
import Proptypes from 'prop-types';
import './CellGrid.css';

const CellGrid = props => {
    console.log(props)
    return (
        <h1>hello</h1>
    );
};

CellGrid.propTypes = {
    cells: Proptypes.array.isRequired,
    handleClick: Proptypes.func.isRequired,
    gridSize: Proptypes.number.isRequired
}

export default CellGrid;