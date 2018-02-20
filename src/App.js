import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={

    };
    //binds
  }
  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
          <div className="col-3"><button>1</button></div>
          <div className="col-3"><button>2</button></div>
          <div className="col-3"><button>3</button></div>
          <div className="col-3"><button>4</button></div>
          <div className="col-3"><button>5</button></div>
          <div className="col-3"><button>6</button></div>
          <div className="col-3"><button>0</button></div>
          <div className="col-3"><button>0</button></div>
          <div className="col-3"><button>0</button></div>
          <div className="col-3"><button>0</button></div>
          <div className="col-3"><button>0</button></div>
          <div className="col-3"><button>0</button></div>
          <div className="col-3"><button>0</button></div>
          <div className="col-3"><button>0</button></div>
          <div className="col-3"><button>0</button></div>
          <div className="col-3"><button>0</button></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
