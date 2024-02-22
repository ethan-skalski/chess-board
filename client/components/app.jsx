import React, { useState } from 'react';
import Board from './board.jsx';

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
// stores the previous board states
let stateList = [];
// stores the last square clicked
let focus = '';

// lays out overall structure of the application
const App = () => {
  // handles rendering and rerendering on state change
  const [boardState, setboardState] = useState(matrix);

  // function thats ran when a square is clicked
  const handleClick = (target) => {
    // checks if square being clicked is blank and a piece hasn't been selected
    // prevents an empty square from being selected
    // inefficient, can likely be folded into other if statements
    if (boardState[target.id[0]][target.id[1]][0] === '' && focus === '') {
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
      // allows selection to be cancelled if clicking the same piece
    } else if (target.id === focus.id) {
      // deep copy of previous state for rerendering
      const newBoardState = JSON.parse(JSON.stringify(boardState));
      // gives the selected square a black border
      newBoardState[focus.id[0]][focus.id[1]][2] = 'b';
      // rerender
      setboardState(newBoardState);
      // clear the stored square
      focus = '';
      // should only be reached if a square is clicked while a piece is selected
      // checks to prevent capturing own pieces
    } else if (
      boardState[target.id[0]][target.id[1]][1] !==
        boardState[focus.id[0]][focus.id[1]][1] &&
      moveLogic(boardState, focus.id, target.id)
    ) {
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
      // store the unmodified board state
      stateList.push(JSON.parse(JSON.stringify(boardState)));
      // rerender
      setboardState(newBoardState);
    }
  };

  const moveLogic = (state, curr, next) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const currPiece = state[curr[0]][curr[1]][0];
    const currColor = state[curr[0]][curr[1]][1];
    const currLetterIndex = letters.indexOf(curr[0]);
    const nextPiece = state[next[0]][next[1]][0];
    const nextColor = state[next[0]][next[1]][1];
    const nextLetterIndex = letters.indexOf(next[0]);

    if (currColor === 'w') {
      if (currPiece === 'P') {
        if (nextPiece !== '') {
          if (
            (currLetterIndex === nextLetterIndex + 1 ||
              currLetterIndex === nextLetterIndex - 1) &&
            `${+curr[1] + 1}` === next[1]
          )
            return true;
          return false;
        }
        if (curr[0] === next[0] && curr[1] === '2' && next[1] === '4')
          return true;
        if (curr[0] === next[0] && `${+curr[1] + 1}` === next[1]) return true;
        return false;
      }
    } else if (currColor === 'b') {
      if (currPiece === 'P') {
        if (nextPiece !== '') {
          if (
            (currLetterIndex === nextLetterIndex + 1 ||
              currLetterIndex === nextLetterIndex - 1) &&
            `${+curr[1] - 1}` === next[1]
          )
            return true;
          return false;
        }
        if (curr[0] === next[0] && curr[1] === '7' && next[1] === '5')
          return true;
        if (curr[0] === next[0] && `${+curr[1] - 1}` === next[1]) return true;
        return false;
      }
    }
    return true;
  };

  const resetState = () => {
    setboardState(matrix);
    stateList = [];
  };

  const undoState = () => {
    if (stateList.length !== 0) {
      if (stateList.length === 1) {
        stateList.pop();
        setboardState(matrix);
      } else {
        stateList.pop();
        setboardState(stateList[stateList.length - 1]);
      }
    }
    console.log(stateList);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <h1>Solo Project: An Attempt at Chess</h1>
      </div>
      <div>
        <Board
          id='board'
          boardState={boardState}
          setboardState={setboardState}
          handleClick={handleClick}
        />
      </div>
      <div>
        <button
          style={{ height: '70px', width: '280px', margin: '20px' }}
          onClick={resetState}
        >
          Reset
        </button>
        <button
          style={{ height: '70px', width: '280px', margin: '20px' }}
          onClick={undoState}
        >
          Undo
        </button>
      </div>
    </div>
  );
};

// allows access in index.js
export default App;
