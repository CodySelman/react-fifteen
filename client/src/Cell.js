import React from "react";
import Proptypes from "prop-types";
import "./Cell.css";

const Cell = props => {
  const gridSize = props.gridSize;
  const size = 100 / gridSize;
  const blankCellValue = Math.pow(gridSize, 2);
  const columnNum = (props.value - 1) % gridSize;
  const rowNum = Math.floor((props.value - 1) / gridSize);
  //hard coding some values temporarily like image size 500
  const left = columnNum * -500 / gridSize;
  const top = rowNum * -500 / gridSize;

  const style = {
    width: size + "%",
    height: size + "%",
    background:
      props.value === blankCellValue
        ? ""
        : `url(https://lmcdesign-rj6zcy7b8ypu79snuv.netdna-ssl.com/wp-content/uploads/2016/01/Shrek_Tile-1-500x500.jpg) ${left}px ${top}px`
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
  gridSize: Proptypes.number.isRequired,
  sizeRow: Proptypes.number.isRequired,
  sizeCol: Proptypes.number.isRequired
};

export default Cell;
