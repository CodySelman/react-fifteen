import React, { Component } from "react";
import "./App.css";
import CellGrid from "./CellGrid.js";
import CategoryGrid from "./CategoryGrid.js";
import Heading from "./Heading.js";
import Loader from "./Loader.js";

import { getImageUrls } from "./services/imageUrls.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sizeRow: 2,
      sizeCol: 2,
      cells: [],
      isSolved: false,
      hasStarted: false,
      imageUrls: "",
      categories: [
        "Puppies",
        "Kittens",
        "Dogs",
        "Cats",
        "Snails",
        "Bugs",
        "Birds",
        "Dinosaurs",
        "Sculptures",
        "Paintings",
        "Architecture",
        "Sailboats"
      ],
      isCategoryChosen: false,
      currentImage: {
        url: "",
        height: 500,
        width: 500
      },
      isLoading: false,
      viewingFullImage: false,
      score: 0,
      selectedCell: null
    };
    this.randomizeGrid = this.randomizeGrid.bind(this);
    this.winCheck = this.winCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getImages = this.getImages.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.newGame = this.newGame.bind(this);
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
  handleClick(index){
    const cells = this.state.cells;
    const sizeCol = this.state.sizeCol;
    if (this.state.hasStarted === false){
      this.randomizeGrid();
      this.setState({hasStarted: true});
    } else if (!this.state.selectedCell) {
      this.setState({selectedCell: index}, console.log(this.state.selectedCell));
    } else if (this.state.selectedCell){
      //slide left
      if (
        cells[index - 1] &&
        (index - 1) === this.state.selectedCell
      ) {
        this.slideLeft(index);
      } else if (
        cells[index + 1] &&
        (index + 1) === this.state.selectedCell
      ) {
        this.slideRight(index);
      } else if (
        cells[index - sizeCol]
      ) {
        this.slideUp(index);
      } else if (
        cells[index + sizeCol]
      ) {
        this.slideDown(index);
      }
      this.setState({selectedCell: null});
    }
  }
  slideUp(index){
    const selectedCellIndex = this.state.selectedCell;
    const first = this.state.cells.slice( 0, selectedCellIndex);
    const selectedCell = this.state.cells[selectedCellIndex];
    const between = this.state.cells.slice( selectedCellIndex + 1, index);
    const swapCell = this.state.cells[index];
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      {swapCell, value: swapCell.value},
      ...between,
      {selectedCell, value: selectedCell.value},
      ...last
    ];
    this.setState({cells: newCells});
  }
  slideDown(index){
    console.log('slideDown');
  }
  slideLeft(index){
    const swapCell = this.state.cells[index];
    const selectedCell = this.state.cells[this.state.selectedCell];
    const first = this.state.cells.slice(0, index - 1);
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      {swapCell, value: this.state.cells[index].value},
      {selectedCell, value: this.state.cells[index - 1].value},
      ...last
    ];
    this.setState({cells: newCells});
  }
  slideRight(index){
    const swapCell = this.state.cells[index];
    const selectedCell = this.state.cells[this.state.selectedCell];
    const first = this.state.cells.slice(0, index);
    const last = this.state.cells.slice(index + 2);
    const newCells = [
      ...first,
      {selectedCell, value: this.state.cells[index + 1].value},
      {swapCell, value: this.state.cells[index].value},
      ...last
    ];
    this.setState({cells: newCells});
  }
  randomizeGrid(){
    console.log('randomizeGrid');
  }
  // handleClick(index) {
  //   //if there is a cell above, below, left, or right of clicked cell, with value 0, swapCell
  //   const cells = this.state.cells;
  //   const sizeCol = this.state.sizeCol;
  //   const blankCellValue = this.state.sizeRow * sizeCol;
  //   if (this.state.hasStarted === false) {
  //     this.randomizeGrid();
  //     this.setState({
  //       hasStarted: true
  //     });
  //   } else if (
  //     cells[index - 1] &&
  //     index % sizeCol !== 0 &&
  //     cells[index - 1].value === blankCellValue
  //   ) {
  //     this.slideLeft(index);
  //   } else if (
  //     cells[index - sizeCol] &&
  //     cells[index - sizeCol].value === blankCellValue
  //   ) {
  //     this.slideUp(index);
  //   } else if (
  //     cells[index + 1] &&
  //     index % sizeCol !== sizeCol - 1 &&
  //     cells[index + 1].value === blankCellValue
  //   ) {
  //     this.slideRight(index);
  //   } else if (
  //     cells[index + sizeCol] &&
  //     cells[index + sizeCol].value === blankCellValue
  //   ) {
  //     this.slideDown(index);
  //   }
  // }
  // slideUp(index) {
  //   const sizeCol = this.state.sizeCol;
  //   const blankCellValue = this.state.sizeRow * sizeCol;
  //   const first = this.state.cells.slice(0, index - sizeCol);
  //   const blankCell = this.state.cells[index - sizeCol];
  //   const between = this.state.cells.slice(index - sizeCol + 1, index);
  //   const clickedCell = this.state.cells[index];
  //   const last = this.state.cells.slice(index + 1);
  //   const newCells = [
  //     ...first,
  //     { blankCell, value: this.state.cells[index].value },
  //     ...between,
  //     { clickedCell, value: blankCellValue },
  //     ...last
  //   ];
  //   this.setState({ cells: newCells }, this.winCheck);
  // }
  // slideDown(index) {
  //   const sizeCol = this.state.sizeCol;
  //   const blankCellValue = this.state.sizeRow * sizeCol;
  //   const first = this.state.cells.slice(0, index);
  //   const clickedCell = this.state.cells[index];
  //   const between = this.state.cells.slice(index + 1, index + sizeCol);
  //   const blankCell = this.state.cells[index + sizeCol];
  //   const last = this.state.cells.slice(index + sizeCol + 1);
  //   const newCells = [
  //     ...first,
  //     { clickedCell, value: blankCellValue },
  //     ...between,
  //     { blankCell, value: this.state.cells[index].value },
  //     ...last
  //   ];
  //   this.setState({ cells: newCells }, this.winCheck);
  // }
  // slideRight(index) {
  //   const blankCellValue = this.state.sizeRow * this.state.sizeCol;
  //   const first = this.state.cells.slice(0, index);
  //   const clickedCell = this.state.cells[index];
  //   const blankCell = this.state.cells[index + 1];
  //   const last = this.state.cells.slice(index + 2);
  //   const newCells = [
  //     ...first,
  //     { clickedCell, value: blankCellValue },
  //     { blankCell, value: this.state.cells[index].value },
  //     ...last
  //   ];
  //   this.setState({ cells: newCells }, this.winCheck);
  // }
  // slideLeft(index) {
  //   const blankCellValue = this.state.sizeRow * this.state.sizeCol;
  //   const clickedCell = this.state.cells[index];
  //   const blankCell = this.state.cells[index - 1];
  //   const first = this.state.cells.slice(0, index - 1);
  //   const last = this.state.cells.slice(index + 1);
  //   const newCells = [
  //     ...first,
  //     { blankCell, value: this.state.cells[index].value },
  //     { clickedCell, value: blankCellValue },
  //     ...last
  //   ];
  //   this.setState({ cells: newCells }, this.winCheck);
  // }
  // randomizeGrid() {
  //   const sizeCol = this.state.sizeCol;
  //   const gridSize = sizeCol * this.state.sizeRow;
  //   let randomCellArray = this.state.cells;
  //   let emptyCellIndex = randomCellArray.findIndex(
  //     item => item.value === gridSize
  //   );
  //   for (let i = 0; i < gridSize * 100; i += 1) {
  //     const randomSlide = Math.floor(Math.random() * 4);
  //     if (
  //       randomSlide === 0 &&
  //       emptyCellIndex % sizeCol !== sizeCol - 1 &&
  //       randomCellArray[emptyCellIndex + 1]
  //     ) {
  //       const temp = randomCellArray[emptyCellIndex];
  //       randomCellArray[emptyCellIndex] = randomCellArray[emptyCellIndex + 1];
  //       randomCellArray[emptyCellIndex + 1] = temp;
  //       emptyCellIndex += 1;
  //     } else if (
  //       randomSlide === 1 &&
  //       this.state.cells[emptyCellIndex + sizeCol]
  //     ) {
  //       const temp = randomCellArray[emptyCellIndex];
  //       randomCellArray[emptyCellIndex] =
  //         randomCellArray[emptyCellIndex + sizeCol];
  //       randomCellArray[emptyCellIndex + sizeCol] = temp;
  //       emptyCellIndex += sizeCol;
  //     } else if (
  //       randomSlide === 2 &&
  //       emptyCellIndex % sizeCol !== 0 &&
  //       this.state.cells[emptyCellIndex - 1]
  //     ) {
  //       const temp = randomCellArray[emptyCellIndex];
  //       randomCellArray[emptyCellIndex] = randomCellArray[emptyCellIndex - 1];
  //       randomCellArray[emptyCellIndex - 1] = temp;
  //       emptyCellIndex -= 1;
  //     } else if (
  //       randomSlide === 3 &&
  //       this.state.cells[emptyCellIndex - sizeCol]
  //     ) {
  //       const temp = randomCellArray[emptyCellIndex];
  //       randomCellArray[emptyCellIndex] =
  //         randomCellArray[emptyCellIndex - sizeCol];
  //       randomCellArray[emptyCellIndex - sizeCol] = temp;
  //       emptyCellIndex -= sizeCol;
  //     }
  //   }
  //   this.setState({
  //     cells: randomCellArray
  //   });
  // }
  winCheck() {
    const winCheckArray = this.state.cells.map(cell => cell.value - 1);
    if (winCheckArray.every((index, element) => index === element)) {
      this.setState({
        isSolved: true,
        viewingFullImage: true,
      });
    }
  }
  getImages(searchTerm) {
    getImageUrls(searchTerm)
      .then(response => {
        const imageUrls = response.data;
        this.setState(
          {
            imageUrls: imageUrls
          },
          this.changeImage
        );
      })
      .then(this.setState({ isLoading: true }))
      .catch(error => {
        console.log(error);
      });
  }
  changeImage() {
    const imageUrls = this.state.imageUrls;
    const newImageIndex = Math.floor(Math.random() * imageUrls.hits.length);
    const newImageData = imageUrls.hits[newImageIndex];
    const newImageUrl = newImageData.webformatURL;
    const newImageWidth = newImageData.webformatWidth;
    const newImageHeight = newImageData.webformatHeight;
    const img = new Image();
    img.onload = () => {
      const newImage = {
        url: newImageUrl,
        width: newImageWidth,
        height: newImageHeight
      };
      this.setState(
        {
          currentImage: newImage,
          isSolved: false
        },
        this.setState(
          { isCategoryChosen: true },
          this.setState({ isLoading: false })
        )
      );
    };
    img.src = newImageUrl;
  }
  changeDifficulty() {
    if (this.state.sizeCol > this.state.sizeRow) {
      this.setState(
        {
          sizeRow: this.state.sizeRow + 1
        },
        this.gameStart
      );
    } else {
      this.setState(
        {
          sizeCol: this.state.sizeCol + 1
        },
        this.gameStart
      );
    }
  }
  nextLevel() {
    Promise.resolve()
      .then(this.setState({score: this.state.score + 1}))
      .then(this.setState({ isLoading: true }))
      .then(this.changeImage())
      .then(this.setState({hasStarted: false}))
      .then(this.setState({viewingFullImage: false}))
      .then(this.changeDifficulty())
      .catch(err => console.log(err));
  }
  newGame(){
    this.setState({
      ...this.state,
      sizeRow: 2,
      sizeCol: 2,
      cells: [],
      isSolved: false,
      hasStarted: false,
      imageUrls: "",
      isCategoryChosen: false,
      currentImage: {
        url: "",
        height: 500,
        width: 500
      },
      isLoading: false,
      viewingFullImage: false,
      score: 0
    }, this.gameStart)
  }
  render() {
    return (
      <div>
        <Heading 
          changeImage={this.changeImage}
          score={this.state.score}
          newGame={this.newGame}
        />
        <div className="App--CellGrid-container">
          {this.state.isLoading ? <Loader /> : ""}
          {this.state.isCategoryChosen ? (
            <CellGrid
              cells={this.state.cells}
              handleClick={this.handleClick}
              sizeRow={this.state.sizeRow}
              sizeCol={this.state.sizeCol}
              currentImage={this.state.currentImage}
              changeImage={this.changeImage}
              viewingFullImage={this.state.viewingFullImage}
              selectedCellValue={this.state.cells[this.state.selectedCell] ? this.state.cells[this.state.selectedCell].value : null}
            />
          ) : (
            <CategoryGrid
              categories={this.state.categories}
              getImages={this.getImages}
              isLoading={this.state.isLoading}
            />
          )}
        </div>

        <div className='App-bottomButtonContainer'>
            { this.state.isSolved ? 
              <button className='fadeIn' onClick={this.nextLevel}>Next Level</button>
              : ''
            }
            <button className='fadeIn' onMouseEnter={() => this.setState({viewingFullImage: true})} 
              onMouseLeave={() => this.state.isSolved ? '' : this.setState({viewingFullImage: false})}
            >View Full Image</button>
          </div>
      </div>
    );
  }
}

export default App;
