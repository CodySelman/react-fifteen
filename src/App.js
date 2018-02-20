import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      cells: []
    };
    //binds
  }
  componentDidMount(){
    console.log('hello');
  }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
          <div className="col-3"><button className='w-100'>1</button></div>
          <div className="col-3"><button className='w-100'>2</button></div>
          <div className="col-3"><button className='w-100'>3</button></div>
          <div className="col-3"><button className='w-100'>4</button></div>
          <div className="col-3"><button className='w-100'>5</button></div>
          <div className="col-3"><button className='w-100'>6</button></div>
          <div className="col-3"><button className='w-100'>7</button></div>
          <div className="col-3"><button className='w-100'>8</button></div>
          <div className="col-3"><button className='w-100'>9</button></div>
          <div className="col-3"><button className='w-100'>10</button></div>
          <div className="col-3"><button className='w-100'>11</button></div>
          <div className="col-3"><button className='w-100'>12</button></div>
          <div className="col-3"><button className='w-100'>13</button></div>
          <div className="col-3"><button className='w-100'>14</button></div>
          <div className="col-3"><button className='w-100'>15</button></div>
          <div className="col-3"><button className='w-100'>-</button></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
