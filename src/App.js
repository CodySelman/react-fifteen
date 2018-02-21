import React, { Component } from 'react';
import './App.css';
import Cell from './Cell.js';

class App extends Component {
  constructor(){
    super();
    this.state={
      cells: []
    };
    //binds
  }
  componentDidMount(){
    this.gameStart();
  }
  gameStart(){
    let newCells = [];
    for(let i=0;i<16;i+=1){
      let cell = {value: i};
      newCells.push(cell);
    }
    this.setState({
      cells: newCells
    });
  }
  render() {
    const {cells} = this.state;
    const CellGrid = cells.map((cell, index) => <Cell key={index} value={cell.value}/>)
    return (
      <div>
        <h1 className='text-center'>React Fifteen</h1>
        <div className='container'>
          <div className='row'>
            {CellGrid}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
