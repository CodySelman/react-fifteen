import React, { Component } from "react";
import "./App.css";
import CellGrid from "./CellGrid.js";
import CategoryGrid from './CategoryGrid.js';
import Heading from './Heading.js';

import {getImageUrls} from './services/imageUrls.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sizeRow: 2,
      sizeCol: 3,
      cells: [],
      winText: "",
      hasStarted: false,
      imageUrls: '',
      categories: ['Puppies', 'Kittens', 'Dogs', 'Cats', 'Snails', 'Bugs', 'Birds', 'Dinosaurs', 'Sculptures', 'Paintings', 'Architecture', 'Sailboats'],
      isCategoryChosen: false,
      currentImage: {
        url: '',
        height: 500,
        width: 500
      }
    };
    this.randomizeGrid = this.randomizeGrid.bind(this);
    this.winCheck = this.winCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getImages = this.getImages.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
  }
  componentDidMount() {
    this.gameStart();
  }
  gameStart() {
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
    //if there is a cell above, below, left, or right of clicked cell, with value 0, swapCell
    const cells = this.state.cells;
    const sizeCol = this.state.sizeCol;
    const blankCellValue = this.state.sizeRow * sizeCol;
    if (this.state.hasStarted === false) {
      this.randomizeGrid();
      this.setState({
        hasStarted: true
      })
    } else if (
      cells[index - 1] &&
      index % sizeCol !== 0 &&
      cells[index - 1].value === blankCellValue
    ) {
      this.slideLeft(index);
    } else if (
      cells[index - sizeCol] &&
      cells[index - sizeCol].value === blankCellValue
    ) {
      this.slideUp(index);
    } else if (
      cells[index + 1] &&
      index % sizeCol !== sizeCol - 1 &&
      cells[index + 1].value === blankCellValue
    ) {
      this.slideRight(index);
    } else if (
      cells[index + sizeCol] &&
      cells[index + sizeCol].value === blankCellValue
    ) {
      this.slideDown(index);
    }
  }
  slideUp(index) {
    const sizeCol = this.state.sizeCol;
    const blankCellValue = this.state.sizeRow * sizeCol;
    const first = this.state.cells.slice(0, index - sizeCol);
    const blankCell = this.state.cells[index - sizeCol];
    const between = this.state.cells.slice(index - sizeCol + 1, index);
    const clickedCell = this.state.cells[index];
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      { blankCell, value: this.state.cells[index].value },
      ...between,
      { clickedCell, value: blankCellValue },
      ...last
    ];
    this.setState({ cells: newCells }, this.winCheck);
  }
  slideDown(index) {
    const sizeCol = this.state.sizeCol;
    const blankCellValue = this.state.sizeRow * sizeCol;
    const first = this.state.cells.slice(0, index);
    const clickedCell = this.state.cells[index];
    const between = this.state.cells.slice(index + 1, index + sizeCol);
    const blankCell = this.state.cells[index + sizeCol];
    const last = this.state.cells.slice(index + sizeCol + 1);
    const newCells = [
      ...first,
      { clickedCell, value: blankCellValue },
      ...between,
      { blankCell, value: this.state.cells[index].value },
      ...last
    ];
    this.setState({ cells: newCells }, this.winCheck);
  }
  slideRight(index) {
    const blankCellValue = this.state.sizeRow * this.state.sizeCol;
    const first = this.state.cells.slice(0, index);
    const clickedCell = this.state.cells[index];
    const blankCell = this.state.cells[index + 1];
    const last = this.state.cells.slice(index + 2);
    const newCells = [
      ...first,
      { clickedCell, value: blankCellValue },
      { blankCell, value: this.state.cells[index].value },
      ...last
    ];
    this.setState({ cells: newCells }, this.winCheck);
  }
  slideLeft(index) {
    const blankCellValue = this.state.sizeRow * this.state.sizeCol;
    const clickedCell = this.state.cells[index];
    const blankCell = this.state.cells[index - 1];
    const first = this.state.cells.slice(0, index - 1);
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      { blankCell, value: this.state.cells[index].value },
      { clickedCell, value: blankCellValue },
      ...last
    ];
    this.setState({ cells: newCells }, this.winCheck);
  }
  randomizeGrid() {
    const sizeCol = this.state.sizeCol;
    const gridSize = sizeCol * this.state.sizeRow;
    let randomCellArray = this.state.cells;
    let emptyCellIndex = randomCellArray.findIndex(
      item => item.value === gridSize
    );
    for (let i = 0; i < gridSize * 100; i += 1) {
      const randomSlide = Math.floor(Math.random() * 4);
      if (
        randomSlide === 0 &&
        emptyCellIndex % sizeCol !== sizeCol - 1 &&
        randomCellArray[emptyCellIndex + 1]
      ) {
        const temp = randomCellArray[emptyCellIndex];
        randomCellArray[emptyCellIndex] = randomCellArray[emptyCellIndex + 1];
        randomCellArray[emptyCellIndex + 1] = temp;
        emptyCellIndex += 1;
      } else if (
        randomSlide === 1 &&
        this.state.cells[emptyCellIndex + sizeCol]
      ) {
        const temp = randomCellArray[emptyCellIndex];
        randomCellArray[emptyCellIndex] =
          randomCellArray[emptyCellIndex + sizeCol];
        randomCellArray[emptyCellIndex + sizeCol] = temp;
        emptyCellIndex += sizeCol;
      } else if (
        randomSlide === 2 &&
        emptyCellIndex % sizeCol !== 0 &&
        this.state.cells[emptyCellIndex - 1]
      ) {
        const temp = randomCellArray[emptyCellIndex];
        randomCellArray[emptyCellIndex] = randomCellArray[emptyCellIndex - 1];
        randomCellArray[emptyCellIndex - 1] = temp;
        emptyCellIndex -= 1;
      } else if (
        randomSlide === 3 &&
        this.state.cells[emptyCellIndex - sizeCol]
      ) {
        const temp = randomCellArray[emptyCellIndex];
        randomCellArray[emptyCellIndex] =
          randomCellArray[emptyCellIndex - sizeCol];
        randomCellArray[emptyCellIndex - sizeCol] = temp;
        emptyCellIndex -= sizeCol;
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
  getImages(searchTerm){
    getImageUrls(searchTerm)
      .then(response => {
        const imageUrls = response.data;
        this.setState({
          imageUrls: imageUrls
        }, this.changeImage);
      })
      .catch(error => {
        console.log(error);
      });
  }
  changeImage(){
    const imageUrls = this.state.imageUrls;
    const newImageIndex = Math.floor( Math.random() * imageUrls.hits.length );
    const newImageData = imageUrls.hits[newImageIndex];
    const newImageUrl = newImageData.webformatURL;
    const newImageWidth = newImageData.webformatWidth;
    const newImageHeight = newImageData.webformatHeight;
    const newImage = {
      url: newImageUrl,
      width: newImageWidth,
      height: newImageHeight
    };
    this.setState({
      currentImage: newImage
    });
  }
  chooseCategory(searchTerm){
    Promise.resolve()
      .then(this.getImages(searchTerm))
      .then(this.setState({isCategoryChosen: true}))
      .catch(err => console.log(err))
  }
  changeDifficulty(){
    if(this.state.sizeCol > this.state.sizeRow){ 
      this.setState({
        sizeRow: this.state.sizeRow + 1
      }, this.gameStart)
    } else {
      this.setState({
        sizeCol: this.state.sizeCol + 1
      }, this.gameStart)
    }
  }
  render() {
    return (
      <div>
        <Heading />

        {this.state.isCategoryChosen 
        ? 
          <div className='App--CellGrid-container'>
            <CellGrid
              cells={this.state.cells}
              handleClick={this.handleClick}
              sizeRow={this.state.sizeRow}
              sizeCol={this.state.sizeCol}
              currentImage={this.state.currentImage}
              changeImage={this.changeImage}
            />
          </div>
        :
          <div className='App--CellGrid-container'>
            <CategoryGrid 
              categories={this.state.categories}
              chooseCategory={this.chooseCategory}
            />
          </div>
        }
        {this.state.winText}
      </div>
    );
  }
}

export default App;