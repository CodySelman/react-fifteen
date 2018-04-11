import React from "react";
import Proptypes from "prop-types";
import "./Cell.css";

const Cell = props => {
  const sizeRow = props.sizeRow;
  const sizeCol = props.sizeCol;
  const width = 100 / sizeCol;
  const height = 100 / sizeRow;

  const imageUrl = props.currentImage.url;

  const columnNum = (props.value - 1) % sizeCol;
  const rowNum = Math.floor((props.value - 1) / sizeCol);
  const left = columnNum * -640 / sizeCol;
  const top = rowNum * -420 / sizeRow;

  const style = {
    width: width + "%",
    height: height + "%",
    background: `url(${imageUrl}) ${left}px ${top}px`
  };
  return (
    <button
      className={
        props.value === props.selectedCellValue ?
          props.isSwapping === true ? 
          "Cell--cell Cell-isSwapping" 
          :
        "Cell--cell Cell-selected"        
        :
        "Cell--cell"          
      }
      onClick={props.onClick}
      style={style}
    >
    </button>
  );
};

Cell.Proptypes = {
  value: Proptypes.number.isRequired,
  onClick: Proptypes.func.isRequired,
  sizeRow: Proptypes.number.isRequired,
  sizeCol: Proptypes.number.isRequired,
  currentImage: Proptypes.object.isRequired,
  selectedCellValue: Proptypes.number,
  swapCellValue: Proptypes.number,
  isSwapping: Proptypes.bool.isRequired
};

export default Cell;
