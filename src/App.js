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
    //if there is a cell in index-1, +1, -4 or +4, with value 0, swapCell
    const cells = this.state.cells;
    console.log(cells);
    if( 
        (cells[index - 1] && cells[index - 1].value === 0) || 
        (cells[index - 4] && cells[index - 4].value === 0) ||
        (cells[index + 1] && cells[index + 1].value === 0) ||
        (cells[index + 4] && cells[index + 4].value === 0)
      ){
      console.log('swap cell');
    }
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
