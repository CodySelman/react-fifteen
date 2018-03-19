import React from "react";
import Proptypes from "prop-types";
import "./Cell.css";

const Cell = props => {
  const sizeRow = props.sizeRow;
  const sizeCol = props.sizeCol;
  const width = 100 / sizeCol;
  const height = 100 / sizeRow;
  const blankCellValue = sizeRow * sizeCol;

  const imageUrl = props.currentImage.url;
  const imageWidth = props.currentImage.width;
  const imageHeight = props.currentImage.height;
  

  const columnNum = (props.value - 1) % sizeCol;
  const rowNum = Math.floor((props.value - 1) / sizeCol);
  //hard coding some values temporarily like image size 500
  const left = columnNum * -imageWidth / sizeCol;
  const top = rowNum * -imageHeight / sizeRow;

  const style = {
    width: width + "%",
    height: height + "%",
    background:
      props.value === blankCellValue
        ? ""
        : `url(${imageUrl}) ${left}px ${top}px`
  };
  return (
    <button
      className={
        props.value === blankCellValue
          ? "Cell--cell Cell--cell-blank"
          : "Cell--cell"
      }
      onClick={props.onClick}
      style={style}
    >
      {props.value === blankCellValue ? "" : props.value}
    </button>
  );
};

Cell.Proptypes = {
  value: Proptypes.number.isRequired,
  onClick: Proptypes.func.isRequired,
  sizeRow: Proptypes.number.isRequired,
  sizeCol: Proptypes.number.isRequired,
  currentImage: Proptypes.object.isRequired
};

export default Cell;
