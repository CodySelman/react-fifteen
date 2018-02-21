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
    for(let i=0;i<15;i+=1){
      newCells.push(Cell);
    }
    this.setState({
      cells: newCells
    });
  }
  render() {
    return (
      <div>
        <h1 className='text-center'>React Fifteen</h1>
        <div className='container'>
          <div className='row'>
          {this.state.cells}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
