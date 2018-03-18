import React from "react";
import Proptypes from "prop-types";
import "./Cell.css";

const Cell = props => {
  const sizeRow = props.sizeRow;
  const sizeCol = props.sizeCol;
  const width = 100 / sizeCol;
    const height = 100 / sizeRow;
  const blankCellValue = sizeRow * sizeCol;

  const columnNum = (props.value - 1) % sizeCol;
  const rowNum = Math.floor((props.value - 1) / sizeCol);
  //hard coding some values temporarily like image size 500
  const left = columnNum * -500 / sizeCol;
  const top = rowNum * -500 / sizeRow;

  const style = {
    width: width + "%",
    height: height + "%",
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
  sizeRow: Proptypes.number.isRequired,
  sizeCol: Proptypes.number.isRequired
};

export default Cell;
