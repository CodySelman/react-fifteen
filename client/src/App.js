import React, { Component } from "react";
import "./App.css";
import CellGrid from "./CellGrid.js";
import Heading from "./Heading.js";
import Loader from "./Loader.js";
import HowToPlay from './HowToPlay.js';
import easyPics from './images/puzzlePics/easy/easyPics';
import intermediatePics from './images/puzzlePics/intermediate/intermediatePics';
import hardPics from './images/puzzlePics/hard/hardPics';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPics: easyPics,
      sizeRow: 2,
      sizeCol: 2,
      cells: [],
      isSolved: false,
      hasStarted: false,
      currentImage: {
        url: "",
      },
      isLoading: false,
      viewingFullImage: false,
      score: 0,
      selectedCellIndex: null,
      isSwapping: false,
      usingMouse: true,
      timeRemaining: 30000,
      gameOver: false
    };
    this.randomizeGrid = this.randomizeGrid.bind(this);
    this.winCheck = this.winCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.changeGridSize = this.changeGridSize.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.initializeState = this.initializeState.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.timer = this.timer.bind(this);
    this.gameStart = this.gameStart.bind(this);
  }
  componentDidMount() {
    this.gameStart();
  }

  //gamecontroller methods
  gameStart(){
    Promise.resolve()
    .then(this.initializeState())
    .then(this.createCells())
    .then(this.changeImage())
    .catch(err => console.log(err));
  }
  startPuzzle(){
    this.randomizeGrid();
    this.startTimer();
  }
  // solvingPuzzle(){}
  // puzzleSolved(){}
  nextLevel() {
    Promise.resolve()
      .then(this.setState({ 
        isLoading: true,
        hasStarted: false,
        viewingFullImage: false,
        timeRemaining: 0,
      }))
      .then(this.changeDifficulty())
      .then(this.changeImage())
      .then(this.changeGridSize())
      .then(this.setTimer())
      .catch(err => console.log(err));
  }
  gameOver(){
    console.log('game over');
  }
  // newGame(){}?

  initializeState() {
    this.setState(
      {
        ...this.state,
        currentPics: easyPics,
        sizeRow: 2,
        sizeCol: 2,
        cells: [],
        isSolved: false,
        hasStarted: false,
        currentImage: {
          url: "",
        },
        isLoading: false,
        viewingFullImage: false,
        score: 0,
        selectedCellIndex: null,
        isSwapping: false,
        usingMouse: true,
        timeRemaining: 30000,
        gameOver: false
      },
    );
  }
  createCells() {
    const newCells = [];
    const gridSize = this.state.sizeCol * this.state.sizeRow;
    for (let i = 1; i < gridSize + 1; i += 1) {
      let cell = { value: i };
      newCells.push(cell);
    }
    this.setState({
      cells: newCells
    });
  }
  handleClick(index) {
    const cells = this.state.cells;
    const sizeCol = this.state.sizeCol;
    if (this.state.usingMouse === true){
      if (this.state.hasStarted === false) {
        this.startPuzzle();
        this.setState({ hasStarted: true });
      } else if (!this.state.selectedCellIndex) {
        this.setState({ selectedCellIndex: index });
      } else if (
        this.state.selectedCellIndex &&
        this.state.selectedCellIndex === index
      ) {
        this.setState({ selectedCellIndex: null });
      } else if (
        this.state.selectedCellIndex &&
        this.state.selectedCellIndex !== index
      ) {
        const selectedCellIndex = this.state.selectedCellIndex;
        if (
          cells[index - 1] &&
          index - 1 === selectedCellIndex &&
          index % sizeCol !== 0
        ) {
          this.slideLeft(index);
        } else if (
          cells[index + 1] &&
          index + 1 === selectedCellIndex &&
          index % sizeCol !== sizeCol - 1
        ) {
          this.slideRight(index);
        } else if (
          cells[index - sizeCol] &&
          index - sizeCol === selectedCellIndex
        ) {
          this.slideUp(index);
        } else if (
          cells[index + sizeCol] &&
          index + sizeCol === selectedCellIndex
        ) {
          this.slideDown(index);
        }
        this.setState({ selectedCellIndex: null });
      }
    }
  }
  handleKeyPress(e) {
    const selectedCellIndex = this.state.selectedCellIndex;
    const cells = this.state.cells;
    const sizeCol = this.state.sizeCol;
    const isSwapping = this.state.isSwapping;
    if (this.state.hasStarted === false){
      this.startPuzzle();
      this.setState({hasStarted: true});
    } else if (this.state.isSolved === true && e.key === "Enter"){
      this.nextLevel();
    }
    if (this.state.selectedCellIndex === null) {
      this.setState({ selectedCellIndex: 0 });
    } else if (isSwapping === false){
      this.setState({usingMouse: false})
      if (
        e.key === "ArrowRight" &&
        cells[selectedCellIndex + 1] &&
        selectedCellIndex % sizeCol !== sizeCol - 1
      ) {
        this.setState({ selectedCellIndex: selectedCellIndex + 1 });
      } else if (
        e.key === "ArrowLeft" &&
        cells[selectedCellIndex - 1] &&
        selectedCellIndex % sizeCol !== 0
      ) {
        this.setState({ selectedCellIndex: selectedCellIndex - 1 });
      } else if (
        e.key === "ArrowUp" &&
        cells[selectedCellIndex - sizeCol]
      ) {
        this.setState({ selectedCellIndex: selectedCellIndex - sizeCol });
      } else if (
        e.key === "ArrowDown" &&
        cells[selectedCellIndex + sizeCol]
      ) {
        this.setState({ selectedCellIndex: selectedCellIndex + sizeCol });
      } else if (e.key === "Enter" && selectedCellIndex !== null) {
        this.setState({isSwapping: true});
      }
    } else if (isSwapping === true){
      if (
        e.key === "ArrowRight" &&
        cells[selectedCellIndex + 1] &&
        selectedCellIndex % sizeCol !== sizeCol - 1
      ) {
        this.slideRight(selectedCellIndex)
        this.setState({isSwapping: false}, 
          this.setState({selectedCellIndex: selectedCellIndex + 1})
        );
      } else if (
        e.key === "ArrowLeft" &&
        cells[selectedCellIndex - 1] &&
        selectedCellIndex % sizeCol !== 0
      ) {
        this.slideLeft(selectedCellIndex);
        this.setState({isSwapping: false},
          this.setState({selectedCellIndex: selectedCellIndex - 1})
        );
      } else if (
        e.key === "ArrowUp" &&
        cells[selectedCellIndex - sizeCol]
      ) {
        this.slideDown(selectedCellIndex - sizeCol);
        this.setState({isSwapping: false},
          this.setState({selectedCellIndex: selectedCellIndex - sizeCol })
        );
      } else if (
        e.key === "ArrowDown" &&
        cells[selectedCellIndex + sizeCol]
      ) {
        this.slideUp(selectedCellIndex + sizeCol);
        this.setState({isSwapping: false},
          this.setState({selectedCellIndex: selectedCellIndex + sizeCol})
        );
      } else if (e.key === "Enter") {
        this.setState({isSwapping: false});
      }
    }
  }
  slideUp(index) {
    const selectedCellIndex = this.state.selectedCellIndex;
    const first = this.state.cells.slice(0, selectedCellIndex);
    const selectedCell = this.state.cells[selectedCellIndex];
    const between = this.state.cells.slice(selectedCellIndex + 1, index);
    const swapCell = this.state.cells[index];
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      { swapCell, value: swapCell.value },
      ...between,
      { selectedCell, value: selectedCell.value },
      ...last
    ];
    this.setState({ cells: newCells }, this.winCheck);
  }
  slideDown(index) {
    const selectedCellIndex = this.state.selectedCellIndex;
    const first = this.state.cells.slice(0, index);
    const swapCell = this.state.cells[index];
    const between = this.state.cells.slice(index + 1, selectedCellIndex);
    const selectedCell = this.state.cells[selectedCellIndex];
    const last = this.state.cells.slice(selectedCellIndex + 1);
    const newCells = [
      ...first,
      { selectedCell, value: selectedCell.value },
      ...between,
      { swapCell, value: swapCell.value },
      ...last
    ];
    this.setState({ cells: newCells }, this.winCheck);
  }
  slideLeft(index) {
    const swapCell = this.state.cells[index];
    const selectedCell = this.state.cells[this.state.selectedCellIndex];
    const first = this.state.cells.slice(0, index - 1);
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      { swapCell, value: this.state.cells[index].value },
      { selectedCell, value: this.state.cells[index - 1].value },
      ...last
    ];
    this.setState({ cells: newCells }, this.winCheck);
  }
  slideRight(index) {
    const swapCell = this.state.cells[index];
    const selectedCell = this.state.cells[this.state.selectedCellIndex];
    const first = this.state.cells.slice(0, index);
    const last = this.state.cells.slice(index + 2);
    const newCells = [
      ...first,
      { selectedCell, value: this.state.cells[index + 1].value },
      { swapCell, value: this.state.cells[index].value },
      ...last
    ];
    this.setState({ cells: newCells }, this.winCheck);
  }
  randomizeGrid() {
    //Fisher-Yates Shuffle
    const cells = [...this.state.cells];
    let currentIndex = cells.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cells[currentIndex];
      cells[currentIndex] = cells[randomIndex];
      cells[randomIndex] = temporaryValue;
    }
    this.setState({ cells: cells });
  }
  winCheck() {
    const winCheckArray = this.state.cells.map(cell => cell.value - 1);
    if (winCheckArray.every((index, element) => index === element)) {
      this.stopTimer();
      this.setState({
        isSolved: true,
        viewingFullImage: true
      }, this.updateScore());
    }
  }
  updateScore(){
    const score = this.state.score;
    const levelScore = this.state.sizeCol * this.state.sizeRow + Math.floor(this.state.timeRemaining / 5000);
    const newScore = score + levelScore;
    this.setState({ score: newScore});
  }
  changeDifficulty(){
    const score = this.state.score;
    if (score < 50){
      this.setState({currentPics: easyPics});
    } else if (score >= 50 && score < 100){
      this.setState({currentPics: intermediatePics});
    } else if (score >= 100){
      this.setState({currentPics: hardPics});
    }
  }
  changeImage() {
    const currentPics = this.state.currentPics;
    const randomImageIndex = Math.floor(Math.random() * currentPics.length);
    const randomImage = currentPics[randomImageIndex];
    const img = new Image();
    img.onload = () => {
      const newImage = {
        url: randomImage
      };
      this.setState(
        {
          currentImage: newImage,
          isSolved: false
        },
        this.setState({ isLoading: false })
      );
    };
    img.src = randomImage;
  }
  changeGridSize() {
    const sizeCol = this.state.sizeCol;
    const sizeRow = this.state.sizeRow;
    if ((sizeRow + sizeCol) < 10){
      if (sizeCol > sizeRow) {
        this.setState(
          {
            sizeRow: sizeRow + 1
          },
          this.createCells
        );
      } else {
        this.setState(
          {
            sizeCol: sizeCol + 1
          },
          this.createCells
        );
      }
    }
  }
  startTimer(){
    const timerId = setInterval(this.timer, 10);
    this.setState({timerId: timerId});
  }
  timer(){
    const newTimeRemaining = this.state.timeRemaining - 10;
    if (newTimeRemaining >= 0){
      this.setState({timeRemaining: newTimeRemaining});
    } else {
      this.stopTimer();
      this.gameOver();
    }
  }
  stopTimer(){
    clearInterval(this.state.timerId);
  }
  setTimer(){
    const timeRemaining = this.state.timeRemaining;
    const newTimeRemaining = timeRemaining + 30000;
    this.setState({ timeRemaining: newTimeRemaining});
  }
  render() {
    return (
      <div>
        <Heading
          changeImage={this.changeImage}
          score={this.state.score}
          gameStart={this.gameStart}
          timeRemaining={this.state.timeRemaining}
        />
        <div className="App--CellGrid-container">
          {this.state.isLoading ? <Loader /> : ""}
            <CellGrid
              cells={this.state.cells}
              handleClick={this.handleClick}
              sizeRow={this.state.sizeRow}
              sizeCol={this.state.sizeCol}
              currentImage={this.state.currentImage}
              changeImage={this.changeImage}
              viewingFullImage={this.state.viewingFullImage}
              selectedCellValue={
                this.state.cells[this.state.selectedCellIndex]
                  ? this.state.cells[this.state.selectedCellIndex].value
                  : null
              }
              handleKeyPress={this.handleKeyPress}
              isSwapping={this.state.isSwapping}
            />
        </div>
        
        {/* Buttons below should be exported to thier own component. */}
        <div className="App-bottomButtonContainer">
          {this.state.isSolved ? (
            <button className="fadeIn" onClick={this.nextLevel}>
              Next Level
            </button>
          ) : (
            ""
          )}
          {this.state.hasStarted ? (
            <button
              className="fadeIn"
              onMouseEnter={() => this.setState({ viewingFullImage: true })}
              onMouseLeave={() =>
                this.state.isSolved
                  ? ""
                  : this.setState({ viewingFullImage: false })
              }
              onClick={() =>
                this.setState({
                  viewingFullImage: !this.state.viewingFullImage
                })
              }
            >
              View Full Image
            </button>
          ) : (
            ""
          )}
        </div>
        <HowToPlay />
      </div>
    );
  }
}

export default App;
