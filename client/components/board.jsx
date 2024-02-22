import React from 'react';
import Square from './square.jsx';

// stores the last square clicked
let focus = '';

// creates the board and handles its functionality
const Board = (props) => {
  // function thats ran when a square is clicked
  const handleClick = (target) => {
    // checks if square being clicked is blank and a piece hasn't been selected
    // prevents an empty square from being selected
    // inefficient, can likely be folded into other if statements
    if (
      props.boardState[target.id[0]][target.id[1]][0] === '' &&
      focus === ''
    ) {
      focus = '';
      // checks if a piece has not been selected
    } else if (focus === '') {
      // stores the square clicked in the focus varible
      focus = target;
      // deep copy of previous state for rerendering
      const newBoardState = JSON.parse(JSON.stringify(props.boardState));
      // gives the selected square a green border
      newBoardState[focus.id[0]][focus.id[1]][2] = 'g';
      // rerender
      props.setboardState(newBoardState);
      // allows selection to be cancelled if clicking the same piece
    } else if (target.id === focus.id) {
      // deep copy of previous state for rerendering
      const newBoardState = JSON.parse(JSON.stringify(props.boardState));
      // gives the selected square a black border
      newBoardState[focus.id[0]][focus.id[1]][2] = 'b';
      // rerender
      props.setboardState(newBoardState);
      // clear the stored square
      focus = '';
      // should only be reached if a square is clicked while a piece is selected
      // checks to prevent capturing own pieces
    } else if (
      props.boardState[target.id[0]][target.id[1]][1] !==
      props.boardState[focus.id[0]][focus.id[1]][1]
    ) {
      // deep copy of previous state for rerendering
      const newBoardState = JSON.parse(JSON.stringify(props.boardState));
      // removes piece from previously selected square and reverts border to black
      newBoardState[focus.id[0]][focus.id[1]] = ['', '', 'b'];
      // assigns stored piece to currently selected square
      newBoardState[target.id[0]][target.id[1]] =
        props.boardState[focus.id[0]][focus.id[1]];
      // assign selected square border color to black
      newBoardState[target.id[0]][target.id[1]][2] = 'b';
      // reset stored piece
      focus = '';
      // rerender
      props.setboardState(newBoardState);
    }
  };

  // where the board is built
  const grid = [];
  // store the letters for the ids
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  // declares a variable to track the background color for the squares
  let sqColor;
  // iterate from 8 to 1 to generate the rows
  for (let num = 8; num > 0; num--) {
    // where the row is built
    const row = [];
    // ensures the starting background color alternates between rows
    if (num % 2 === 0) sqColor = 'gainsboro';
    else sqColor = 'gray';
    // iterate from 0 to 7 to generate the squares
    for (let lett = 0; lett < 8; lett++) {
      // creates a letter-number id for the current square using the loops and the letters array
      // unique id for each square, each corresponds to an array in the boardState object
      const coords = letters[lett] + num;
      // declares varibles to store the current square's piece, the color of the piece, and the border color
      let piece, pColor, bColor;
      // uses the coords to find the correct piece type
      piece = props.boardState[coords[0]][coords[1]][0];
      // uses the coords to assign piece color to white, black, or no color
      if (props.boardState[coords[0]][coords[1]][1] === 'w') pColor = 'white';
      else if (props.boardState[coords[0]][coords[1]][1] === 'b')
        pColor = 'black';
      else pColor = '';
      // ses the coords to assign border color to black or green
      if (props.boardState[coords[0]][coords[1]][2] === 'b') bColor = 'black';
      else if (props.boardState[coords[0]][coords[1]][2] === 'g')
        bColor = 'green';
      // assigns appropriate image
      let img = '';
      if (pColor === 'white') {
        if (piece === 'P') img = 'client/images/pawn_white.png';
        if (piece === 'R') img = 'client/images/rook_white.png';
        if (piece === 'N') img = 'client/images/knight_white.png';
        if (piece === 'B') img = 'client/images/bishop_white.png';
        if (piece === 'Q') img = 'client/images/queen_white.png';
        if (piece === 'K') img = 'client/images/king_white.png';
      } else if (pColor === 'black') {
        if (piece === 'P') img = 'client/images/pawn_black.png';
        if (piece === 'R') img = 'client/images/rook_black.png';
        if (piece === 'N') img = 'client/images/knight_black.png';
        if (piece === 'B') img = 'client/images/bishop_black.png';
        if (piece === 'Q') img = 'client/images/queen_black.png';
        if (piece === 'K') img = 'client/images/king_black.png';
      }

      // adds square to the row
      row.push(
        <Square
          id={coords}
          sqColor={sqColor}
          piece={piece}
          img={img}
          pColor={pColor}
          bColor={bColor}
          handleClick={handleClick}
        />
      );
      // alternates the background color
      if (sqColor === 'gainsboro') sqColor = 'gray';
      else sqColor = 'gainsboro';
    }
    // adds the completed row to the board
    grid.push(
      <div style={{ display: 'flex', flexDirection: 'horizontal' }}>{row}</div>
    );
  }
  // prints the board
  return grid;
};

export default Board;
