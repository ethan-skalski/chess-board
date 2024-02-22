import React, { useState } from 'react';
import Board from './board.jsx';

// initial board state
const matrix = {
  turn: 'w',
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
    if (boardState[target.id[0]][target.id[1]][0] === '' && focus === '') {
      return;
    } else if (
      boardState[target.id[0]][target.id[1]][1] !== boardState.turn &&
      focus === ''
    ) {
      return;
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
      // checks to prevent capturing own pieces and if move is legal
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
      // handles pawn promotion
      if (newBoardState[target.id[0]][target.id[1]][0] === 'P') {
        if (
          newBoardState[target.id[0]][target.id[1]][1] === 'w' &&
          target.id[1] === '8'
        )
          newBoardState[target.id[0]][target.id[1]][0] = 'Q';
        else if (
          newBoardState[target.id[0]][target.id[1]][1] === 'b' &&
          target.id[1] === '1'
        )
          newBoardState[target.id[0]][target.id[1]][0] = 'Q';
      }
      // reset stored piece
      focus = '';
      //swap turn
      if (boardState.turn === 'w') newBoardState.turn = 'b';
      else newBoardState.turn = 'w';
      // store the unmodified board state
      stateList.push(JSON.parse(JSON.stringify(boardState)));
      // rerender
      setboardState(newBoardState);
    }
  };

  // checks if a move is legal
  // currently only works for the pawns
  const moveLogic = (state, curr, next) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const currPiece = state[curr[0]][curr[1]][0];
    const currColor = state[curr[0]][curr[1]][1];
    const currLetterIndex = letters.indexOf(curr[0]);
    const nextPiece = state[next[0]][next[1]][0];
    const nextColor = state[next[0]][next[1]][1];
    const nextLetterIndex = letters.indexOf(next[0]);

    // pawn logic
    if (currPiece === 'P') {
      // separate logic for white
      if (currColor === 'w') {
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
      // separate logic for black
      if (currColor === 'b') {
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
    }

    // knight logic
    if (currPiece === 'N') {
      const moveCoords = [];
      const potentialMoves = [
        [1, 2],
        [-1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, 1],
        [-2, -1],
      ];
      potentialMoves.forEach((el) => {
        if (
          currLetterIndex + el[0] < 8 &&
          currLetterIndex + el[0] >= 0 &&
          +curr[1] + el[1] <= 8 &&
          +curr[1] + el[1] > 0
        ) {
          moveCoords.push(
            letters[currLetterIndex + el[0]] + `${+curr[1] + el[1]}`
          );
        }
      });
      if (moveCoords.includes(next)) return true;
      return false;
    }

    // rook logic
    if (currPiece === 'R') {
      let track;
      // up logic
      if (+curr[1] < +next[1]) {
        track = +curr[1];
        while (track !== +next[1] - 1) {
          track++;
          if (state[curr[0]][`${track}`][0] !== '') return false;
        }
        return true;
      }
      // down logic
      if (+curr[1] > +next[1]) {
        track = +curr[1];
        while (track !== +next[1] + 1) {
          track--;
          if (state[curr[0]][`${track}`][0] !== '') return false;
        }
        return true;
      }
      // right logic
      if (currLetterIndex < nextLetterIndex) {
        track = currLetterIndex;
        while (track !== nextLetterIndex - 1) {
          track++;
          if (state[letters[track]][curr[1]][0] !== '') return false;
        }
        return true;
      }
      // left logic
      if (currLetterIndex > nextLetterIndex) {
        track = currLetterIndex;
        while (track !== nextLetterIndex + 1) {
          track--;
          if (state[letters[track]][curr[1]][0] !== '') return false;
        }
        return true;
      }
    }

    // defaults to true to cover for pieces without implemented logic
    // should be switched to return false when logic for all pieces is finished
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
      <div className='top'>
        <h1>Solo Project: An Attempt at Chess</h1>
      </div>
      <div className='boardContainer'>
        <Board
          id='board'
          boardState={boardState}
          setboardState={setboardState}
          handleClick={handleClick}
        />
      </div>
      <div>
        <button
          // style={{ height: '70px', width: '280px', margin: '20px' }}
          onClick={resetState}
        >
          Reset
        </button>
        <button
          // style={{ height: '70px', width: '280px', margin: '20px' }}
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
