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
      selectedCellIndex: null
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
    } else if (!this.state.selectedCellIndex) {
      this.setState({selectedCellIndex: index});
    } else if (this.state.selectedCellIndex && this.state.selectedCellIndex === index) {
      this.setState({selectedCellIndex: null});
    } else if (this.state.selectedCellIndex && this.state.selectedCellIndex !== index){
      const selectedCellIndex = this.state.selectedCellIndex;
      if (
        cells[index - 1] &&
        (index - 1) === selectedCellIndex &&
        index % sizeCol !==0
      ) {
        this.slideLeft(index);
      } else if (
        cells[index + 1] &&
        (index + 1) === selectedCellIndex &&
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
      this.setState({selectedCellIndex: null});
    }
  }
  slideUp(index){
    const selectedCellIndexIndex = this.state.selectedCellIndex;
    const first = this.state.cells.slice( 0, selectedCellIndexIndex);
    const selectedCellIndex = this.state.cells[selectedCellIndexIndex];
    const between = this.state.cells.slice( selectedCellIndexIndex + 1, index);
    const swapCell = this.state.cells[index];
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      {swapCell, value: swapCell.value},
      ...between,
      {selectedCellIndex, value: selectedCellIndex.value},
      ...last
    ];
    this.setState({cells: newCells}, this.winCheck);
  }
  slideDown(index){
    const selectedCellIndex = this.state.selectedCellIndex;
    const first = this.state.cells.slice(0, index);
    const swapCell = this.state.cells[index];
    const between = this.state.cells.slice(index + 1, selectedCellIndex);
    const last = this.state.cells.slice(selectedCellIndex + 1);
    const newCells = [
      ...first,
      {selectedCellIndex, value: selectedCellIndex.value},
      ...between,
      {swapCell, value: swapCell.value},
      ...last
    ];
    this.setState({cells: newCells}, this.winCheck);
  }
  slideLeft(index){
    const swapCell = this.state.cells[index];
    const selectedCellIndex = this.state.cells[this.state.selectedCellIndex];
    const first = this.state.cells.slice(0, index - 1);
    const last = this.state.cells.slice(index + 1);
    const newCells = [
      ...first,
      {swapCell, value: this.state.cells[index].value},
      {selectedCellIndex, value: this.state.cells[index - 1].value},
      ...last
    ];
    this.setState({cells: newCells}, this.winCheck);
  }
  slideRight(index){
    const swapCell = this.state.cells[index];
    const selectedCellIndex = this.state.cells[this.state.selectedCellIndex];
    const first = this.state.cells.slice(0, index);
    const last = this.state.cells.slice(index + 2);
    const newCells = [
      ...first,
      {selectedCellIndex, value: this.state.cells[index + 1].value},
      {swapCell, value: this.state.cells[index].value},
      ...last
    ];
    this.setState({cells: newCells}, this.winCheck);
  }
  randomizeGrid(){
    //Fisher-Yates Shuffle
    const cells = [...this.state.cells];
    let currentIndex = cells.length, temporaryValue, randomIndex;
    while(0 !== currentIndex){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cells[currentIndex];
      cells[currentIndex] = cells[randomIndex];
      cells[randomIndex] = temporaryValue;
    }
    this.setState({cells: cells})
  }
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
              selectedCellIndexValue={this.state.cells[this.state.selectedCell] ? this.state.cells[this.state.selectedCellIndex].value : null}
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
