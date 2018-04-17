import React from 'react';
import './HowToPlay.css';

const HowToPlay = props => {
    return(
        <div className='HowToPlay'>
            <h1>how to play:</h1>
            <p>Click on the puzzle to begin. Rearrange the tiles back to their original position before the timer runs out!
                Swap tiles by clicking on a tile to select it and then clicking on an adjacent tile to swap their positions. 
                Alternatively, you can play with the keyboard by moving the selector around with the arrow keys, 
                selecting the tile you want to swap with ENTER, and then pressing up, down, left, or right to swap the 
                selected tile with an adhacent tile.
            </p>
        </div>
    );
};

export default HowToPlay;