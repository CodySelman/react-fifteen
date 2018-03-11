import React, { Component } from "react";
import "./App.css";
import Cell from "./Cell.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      gridSize: 2,
      cells: [],
      winText: ""
    };
    this.randomizeGrid = this.randomizeGrid.bind(this);
    this.winCheck = this.winCheck.bind(this);
  }
  componentDidMount() {
    this.gameStart();
  }
  gameStart() {
    let newCells = [];
    for (let i = 1; i < 17; i += 1) {
      let cell = { value: i };
      newCells.push(cell);
    }
    this.setState({
      cells: newCells,
      random: 0
    });
  }
  handleClick(index) {
    //if there is a cell above, below, left, or right of clicked cell, with value 0, swapCell
    const cells = this.state.cells;
    if (cells[index - 1] && index % 4 !== 0 && cells[index - 1].value === 16) {
      this.slideLeft(index);
    } else if (cells[index - 4] && cells[index - 4].value === 16) {
      this.slideUp(index);
    } else if (
      cells[index + 1] &&
      index % 4 !== 3 &&
      cells[index + 1].value === 16
    ) {
      this.slideRight(index);
    } else if (cells[index + 4] && cells[index + 4].value === 16) {
      this.slideDown(index);
    }
  }
  slideUp(index) {
    const first = this.state.cells.slice(0, index - 4);
    const blankCell = this.state.cells[index - 4];
    const between = this.state.cells.slice(index - 3, index);
    const clickedCell = this.state.cells[index];
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      { blankCell, value: this.state.cells[index].value },
      ...between,
      { clickedCell, value: 16 },
      ...last
    ];
    this.setState({ cells: newCells });
  }
  slideDown(index) {
    const first = this.state.cells.slice(0, index);
    const clickedCell = this.state.cells[index];
    const between = this.state.cells.slice(index + 1, index + 4);
    const blankCell = this.state.cells[index + 4];
    const last = this.state.cells.slice(index + 5);
    const newCells = [
      ...first,
      { clickedCell, value: 16 },
      ...between,
      { blankCell, value: this.state.cells[index].value },
      ...last
    ];
    this.setState({ cells: newCells });
  }
  slideRight(index) {
    const first = this.state.cells.slice(0, index);
    const clickedCell = this.state.cells[index];
    const blankCell = this.state.cells[index + 1];
    const last = this.state.cells.slice(index + 2);
    const newCells = [
      ...first,
      { clickedCell, value: 16 },
      { blankCell, value: this.state.cells[index].value },
      ...last
    ];
    this.setState({ cells: newCells });
  }
  slideLeft(index) {
    const clickedCell = this.state.cells[index];
    const blankCell = this.state.cells[index - 1];
    const first = this.state.cells.slice(0, index - 1);
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      { blankCell, value: this.state.cells[index].value },
      { clickedCell, value: 16 },
      ...last
    ];
    this.setState({ cells: newCells });
  }
  randomizeGrid() {
    let randomCellArray = this.state.cells;
    let emptyCellIndex = randomCellArray.findIndex(item => item.value === 16);
    for (let i = 0; i < 250; i += 1) {
      const randomSlide = Math.floor(Math.random() * 4);
      if (
        randomSlide === 0 &&
        emptyCellIndex % 4 !== 3 &&
        randomCellArray[emptyCellIndex + 1]
      ) {
        const temp = randomCellArray[emptyCellIndex];
        randomCellArray[emptyCellIndex] = randomCellArray[emptyCellIndex + 1];
        randomCellArray[emptyCellIndex + 1] = temp;
        emptyCellIndex += 1;
      } else if (randomSlide === 1 && this.state.cells[emptyCellIndex + 4]) {
        const temp = randomCellArray[emptyCellIndex];
        randomCellArray[emptyCellIndex] = randomCellArray[emptyCellIndex + 4];
        randomCellArray[emptyCellIndex + 4] = temp;
        emptyCellIndex += 4;
      } else if (
        randomSlide === 2 &&
        emptyCellIndex % 4 !== 0 &&
        this.state.cells[emptyCellIndex - 1]
      ) {
        const temp = randomCellArray[emptyCellIndex];
        randomCellArray[emptyCellIndex] = randomCellArray[emptyCellIndex - 1];
        randomCellArray[emptyCellIndex - 1] = temp;
        emptyCellIndex -= 1;
      } else if (randomSlide === 3 && this.state.cells[emptyCellIndex - 4]) {
        const temp = randomCellArray[emptyCellIndex];
        randomCellArray[emptyCellIndex] = randomCellArray[emptyCellIndex - 4];
        randomCellArray[emptyCellIndex - 4] = temp;
        emptyCellIndex -= 4;
      }
    }
    this.setState({
      cells: randomCellArray,
      winText: ""
    });
  }
  winCheck() {
    const winCheckArray = this.state.cells.map(cell => cell.value - 1);
    if (winCheckArray.every((index, element) => index === element)) {
      this.setState({
        winText: "You Win!"
      });
    }
  }
  changeGridSize(e) {
    this.setState({
      gridSize: e.target.value
    })
  }
  render() {
    const { cells } = this.state;
    const CellGrid = cells.map((cell, index) => (
      <Cell
        key={index}
        value={cell.value}
        onClick={() => this.handleClick(index)}
      />
    ));
    return (
      <div>
        <h1 className="App--heading">Fifteen</h1>
        <div className="App--CellGrid-container">
          {CellGrid}

          <div className="App--margin-top-3">
            <button onClick={this.randomizeGrid}>Randomize</button>
            <button onClick={this.winCheck}>Win check</button>
          </div>

          <div className="App--margin-top-3">
            <label>Grid Size</label>
            <input
              onChange={e => this.changeGridSize(e)}
              value={this.state.gridSize}
              type="number"
              min="2"
            />
          </div>
        </div>
        {this.state.winText}
      </div>
    );
  }
}

export default App;
