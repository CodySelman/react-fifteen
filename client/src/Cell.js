import React from 'react';
import Proptypes from 'prop-types';
import './Cell.css';

const Cell = props => {
    const size = 100 / props.gridSize;
    const columnNum = (props.value - 1) % props.gridSize;
    const rowNum = Math.floor( (props.value - 1) / props.gridSize);
    //hard coding some values temporarily like image size 500
    const left = columnNum * -500/3  ;
    const top = rowNum * -500/3;
    const style = {
        width: size + '%',
        height: size + '%',
        background: `url(https://lmcdesign-rj6zcy7b8ypu79snuv.netdna-ssl.com/wp-content/uploads/2016/01/Shrek_Tile-1-500x500.jpg) ${left}px ${top}px`
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