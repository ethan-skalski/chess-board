import React, { useState, useEffect, Component } from 'react';
// import pawn from './images/chess_pawn.png';

// initial board state
const matrix = {
  a: {
    1: ['R', 'w', 'b'],
    2: ['P', 'w', 'b'],
    3: ['', '', 'b'],
    4: ['', '', 'b'],
    5: ['', '', 'b'],
    6: ['', '', 'b'],
    7: ['P', 'b', 'b'],
    8: ['R', 'b', 'b'],
  },
  b: {
    1: ['N', 'w', 'b'],
    2: ['P', 'w', 'b'],
    3: ['', '', 'b'],
    4: ['', '', 'b'],
    5: ['', '', 'b'],
    6: ['', '', 'b'],
    7: ['P', 'b', 'b'],
    8: ['N', 'b', 'b'],
  },
  c: {
    1: ['B', 'w', 'b'],
    2: ['P', 'w', 'b'],
    3: ['', '', 'b'],
    4: ['', '', 'b'],
    5: ['', '', 'b'],
    6: ['', '', 'b'],
    7: ['P', 'b', 'b'],
    8: ['B', 'b', 'b'],
  },
  d: {
    1: ['Q', 'w', 'b'],
    2: ['P', 'w', 'b'],
    3: ['', '', 'b'],
    4: ['', '', 'b'],
    5: ['', '', 'b'],
    6: ['', '', 'b'],
    7: ['P', 'b', 'b'],
    8: ['Q', 'b', 'b'],
  },
  e: {
    1: ['K', 'w', 'b'],
    2: ['P', 'w', 'b'],
    3: ['', '', 'b'],
    4: ['', '', 'b'],
    5: ['', '', 'b'],
    6: ['', '', 'b'],
    7: ['P', 'b', 'b'],
    8: ['K', 'b', 'b'],
  },
  f: {
    1: ['B', 'w', 'b'],
    2: ['P', 'w', 'b'],
    3: ['', '', 'b'],
    4: ['', '', 'b'],
    5: ['', '', 'b'],
    6: ['', '', 'b'],
    7: ['P', 'b', 'b'],
    8: ['B', 'b', 'b'],
  },
  g: {
    1: ['N', 'w', 'b'],
    2: ['P', 'w', 'b'],
    3: ['', '', 'b'],
    4: ['', '', 'b'],
    5: ['', '', 'b'],
    6: ['', '', 'b'],
    7: ['P', 'b', 'b'],
    8: ['N', 'b', 'b'],
  },
  h: {
    1: ['R', 'w', 'b'],
    2: ['P', 'w', 'b'],
    3: ['', '', 'b'],
    4: ['', '', 'b'],
    5: ['', '', 'b'],
    6: ['', '', 'b'],
    7: ['P', 'b', 'b'],
    8: ['R', 'b', 'b'],
  },
};

// stores the last square clicked
let focus = '';

// lays out overall structure of the application
const App = () => {
  return (
    <>
      <div>
        <h1>Solo Project: An Attempt at Chess</h1>
      </div>
      <div>
        <Board id='board' />
      </div>
    </>
  );
};

// creates the board and handles its functionality
const Board = () => {
  // handles rendering and rerendering on state change
  const [boardState, setboardState] = useState(matrix);

  // function thats ran when a square is clicked
  const handleClick = (target) => {
    // checks if square being clicked is blank and a piece hasn't been selected
    if (boardState[target.id[0]][target.id[1]][0] === '' && focus === '') {
      // possibly unnecessary
      focus = '';
      // checks if a piece has not been selected
    } else if (focus === '') {
      // stores the square clicked in the focus varible
      focus = target;
      // deep copy of previous state for rerendering
      const newBoardState = JSON.parse(JSON.stringify(boardState));
      // gives the selected square a green border
      newBoardState[focus.id[0]][focus.id[1]][2] = 'g';
      // rerender
      setboardState(newBoardState);
      // should only be reached if a square is clicked while a piece is selected
    } else {
      // deep copy of previous state for rerendering
      const newBoardState = JSON.parse(JSON.stringify(boardState));
      // removes piece from previously selected square and reverts border to black
      newBoardState[focus.id[0]][focus.id[1]] = ['', '', 'b'];
      // assigns stored piece to currently selected square
      newBoardState[target.id[0]][target.id[1]] =
        boardState[focus.id[0]][focus.id[1]];
      // assign selected square border color to black
      newBoardState[target.id[0]][target.id[1]][2] = 'b';
      // reset stored piece
      focus = '';
      // rerender
      setboardState(newBoardState);
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
      piece = boardState[coords[0]][coords[1]][0];
      // uses the coords to assign piece color to white, black, or no color
      if (boardState[coords[0]][coords[1]][1] === 'w') pColor = 'white';
      else if (boardState[coords[0]][coords[1]][1] === 'b') pColor = 'black';
      else pColor = '';
      // ses the coords to assign border color to black or green
      if (boardState[coords[0]][coords[1]][2] === 'b') bColor = 'black';
      else if (boardState[coords[0]][coords[1]][2] === 'g') bColor = 'green';
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

// creates the individual squares in the board
const Square = (props) => {
  return (
    <div
      style={{
        height: '70px',
        width: '70px',
        border: 'solid',
        fontSize: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: props.pColor,
        backgroundColor: props.sqColor,
        borderColor: props.bColor,
      }}
      onClick={(e) => props.handleClick(e.target)}
      id={props.id}
      key={props.id}
    >
      {/* {props.piece} */}
      <img src={props.img} id={props.id} />
    </div>
  );
};

// allows access in index.js
export default App;
