import React, { Component } from 'react';
import './App.css';
import Cell from './Cell.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cells: []
    };
    //binds
  }
  componentDidMount() {
    this.gameStart();
  }
  gameStart() {
    let newCells = [];
    for (let i = 0; i < 16; i += 1) {
      let cell = { value: i, index: i };
      newCells.push(cell);
    }
    this.setState({
      cells: newCells
    });
  }
  handleClick(index) {
    //if there is a cell above, below, left, or right of clicked cell, with value 0, swapCell
    const cells = this.state.cells;
    if(cells[index - 1] && cells[index - 1].value === 0){
      console.log('handleClick - slideLeft');
      this.slideLeft(index);
    } else if (cells[index - 4] && cells[index - 4].value === 0){
      console.log('handleClick - slideUp');
      this.slideUp(index);
    } else if (cells[index + 1] && cells[index + 1].value === 0){
      console.log('handleClick - slideRight');
      this.slideRight(index);
    } else if (cells[index + 4] && cells[index + 4].value === 0){
      console.log('handleClick - slideDown');
      this.slideDown();
    }
  }
  slideUp(index){
    console.log('slideUp' + index);
    const first = this.state.cells.slice(0, index - 4);
    const blankCell = this.state.cells[index - 4];
    const between = this.state.cells.slice(index - 3, index);
    const clickedCell = this.state.cells[index];
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      {blankCell, value: this.state.cells[index].value},
      ...between,
      {clickedCell, value: 0},
      ...last
    ];
    this.setState({'cells': newCells});
  }
  slideDown(index){

  }
  slideRight(index){
    console.log('slideRight ' + index);

    const first = this.state.cells.slice(0, index);
    const clickedCell = this.state.cells[index];
    const blankCell = this.state.cells[index + 1];
    const last = this.state.cells.slice(index + 2);
    const newCells = [
      ...first,
      {clickedCell, value: 0},
      {blankCell, value: this.state.cells[index].value},
      ...last
    ];
    this.setState({'cells': newCells});
  }
  slideLeft(index){
    console.log('slideLeft ' + index);

    const clickedCell = this.state.cells[index];
    const blankCell = this.state.cells[index -1];
    const first = this.state.cells.slice(0, index -1);
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      {blankCell, value: this.state.cells[index].value},
      {clickedCell, value: 0},
      ...last
    ];
    this.setState({'cells': newCells});
  }
  render() {
    const { cells } = this.state;
    const CellGrid = cells.map((cell, index) =>
      <Cell key={index}
        index={cell.index}
        value={cell.value}
        onClick={() => this.handleClick(index)}
      />
    )
    return (
      <div>
        <h1 className='App--heading'>React Fifteen</h1>
        <div className='App--CellGrid-container'>
          {CellGrid}
        </div>
      </div>
    );
  }
}

export default App;
