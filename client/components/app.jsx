import React, { useState } from 'react';
import Board from './board.jsx';

// initial board state
const initialState = {
  turn: 'w',
  kCastleWhite: true,
  qCastleWhite: true,
  kCastleBlack: true,
  qCastleBlack: true,
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
  const [boardState, setboardState] = useState(initialState);
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

      // check for king location to set castling to false
      if (newBoardState[target.id[0]][target.id[1]][0] === 'K') {
        // white
        if (focus.id === 'e1') {
          // check if white king just castled kingside
          if (target.id === 'g1') {
            // move kingside rook
            newBoardState['f']['1'] = newBoardState['h']['1'];
            newBoardState['h']['1'] = ['', '', 'b'];
          }
          // check if white king just castled queenside
          if (target.id === 'c1') {
            // move queenside rook
            newBoardState['d']['1'] = newBoardState['a']['1'];
            newBoardState['a']['1'] = ['', '', 'b'];
          }
          newBoardState.kCastleWhite = false;
          newBoardState.qCastleWhite = false;
        }
        // black
        if (focus.id[0] === 'e' && focus.id[1] === '8') {
          // check if black king just castled kingside
          if (target.id === 'g8') {
            // move kingside rook
            newBoardState['f']['8'] = newBoardState['h']['8'];
            newBoardState['h']['8'] = ['', '', 'b'];
          }
          // check if black king just castled queenside
          if (target.id === 'c8') {
            // move queenside rook
            newBoardState['d']['8'] = newBoardState['a']['8'];
            newBoardState['a']['8'] = ['', '', 'b'];
          }
          newBoardState.kCastleBlack = false;
          newBoardState.qCastleBlack = false;
        }
      }
      // check for rook location to set castling to false
      if (newBoardState[target.id[0]][target.id[1]][0] === 'R') {
        if (focus.id[0] === 'a' && focus.id[1] === '1')
          newBoardState.qCastleWhite = false;
        if (focus.id[0] === 'h' && focus.id[1] === '1')
          newBoardState.kCastleWhite = false;
        if (focus.id[0] === 'a' && focus.id[1] === '8')
          newBoardState.qCastleBlack = false;
        if (focus.id[0] === 'h' && focus.id[1] === '8')
          newBoardState.kCastleBlack = false;
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

    let track;

    // rook logic
    if (currPiece === 'R') {
      // ensure destination is a straight line from starting position
      if (+curr[1] === +next[1] || currLetterIndex === nextLetterIndex) {
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
    }

    // bishop logic
    if (currPiece === 'B') {
      // ensure destination is diagonal from starting position
      if (
        Math.abs(+curr[1] - +next[1]) ===
        Math.abs(currLetterIndex - nextLetterIndex)
      ) {
        // up/right logic
        if (+curr[1] < +next[1] && currLetterIndex < nextLetterIndex) {
          track = [currLetterIndex, +curr[1]];
          while (
            track[0] !== nextLetterIndex - 1 &&
            track[1] !== +next[1] - 1
          ) {
            track[0] += 1;
            track[1] += 1;
            if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
          }
          return true;
        }
        // up/left logic
        if (+curr[1] < +next[1] && currLetterIndex > nextLetterIndex) {
          track = [currLetterIndex, +curr[1]];
          while (
            track[0] !== nextLetterIndex + 1 &&
            track[1] !== +next[1] - 1
          ) {
            track[0] -= 1;
            track[1] += 1;
            if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
          }
          return true;
        }
        // down/right logic
        if (+curr[1] > +next[1] && currLetterIndex < nextLetterIndex) {
          track = [currLetterIndex, +curr[1]];
          while (
            track[0] !== nextLetterIndex - 1 &&
            track[1] !== +next[1] + 1
          ) {
            track[0] += 1;
            track[1] -= 1;
            if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
          }
          return true;
        }
        // down/left logic
        if (+curr[1] > +next[1] && currLetterIndex > nextLetterIndex) {
          track = [currLetterIndex, +curr[1]];
          while (
            track[0] !== nextLetterIndex + 1 &&
            track[1] !== +next[1] + 1
          ) {
            track[0] -= 1;
            track[1] -= 1;
            if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
          }
          return true;
        }
      }
    }

    // queen logic
    if (currPiece === 'Q') {
      // Straight line logic
      if (+curr[1] === +next[1] || currLetterIndex === nextLetterIndex) {
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
        // Diagonal logic
      } else if (
        Math.abs(+curr[1] - +next[1]) ===
        Math.abs(currLetterIndex - nextLetterIndex)
      ) {
        // up/right logic
        if (+curr[1] < +next[1] && currLetterIndex < nextLetterIndex) {
          track = [currLetterIndex, +curr[1]];
          while (
            track[0] !== nextLetterIndex - 1 &&
            track[1] !== +next[1] - 1
          ) {
            track[0] += 1;
            track[1] += 1;
            if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
          }
          return true;
        }
        // up/left logic
        if (+curr[1] < +next[1] && currLetterIndex > nextLetterIndex) {
          track = [currLetterIndex, +curr[1]];
          while (
            track[0] !== nextLetterIndex + 1 &&
            track[1] !== +next[1] - 1
          ) {
            track[0] -= 1;
            track[1] += 1;
            if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
          }
          return true;
        }
        // down/right logic
        if (+curr[1] > +next[1] && currLetterIndex < nextLetterIndex) {
          track = [currLetterIndex, +curr[1]];
          while (
            track[0] !== nextLetterIndex - 1 &&
            track[1] !== +next[1] + 1
          ) {
            track[0] += 1;
            track[1] -= 1;
            if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
          }
          return true;
        }
        // down/left logic
        if (+curr[1] > +next[1] && currLetterIndex > nextLetterIndex) {
          track = [currLetterIndex, +curr[1]];
          while (
            track[0] !== nextLetterIndex + 1 &&
            track[1] !== +next[1] + 1
          ) {
            track[0] -= 1;
            track[1] -= 1;
            if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
          }
          return true;
        }
      }
    }

    // king logic
    if (currPiece === 'K') {
      // castling logic
      // white
      if (currColor === 'w' && curr === 'e1') {
        // kingside castle
        if (
          state.kCastleWhite === true &&
          next === 'g1' &&
          state.f['1'][0] === ''
        ) {
          return true;
        }
        // queenside castle
        if (
          state.qCastleWhite === true &&
          next === 'c1' &&
          state.b['1'][0] === '' &&
          state.d['1'][0] === ''
        ) {
          return true;
        }
      }
      // black
      if (currColor === 'b' && curr === 'e8') {
        // kingside castle
        if (
          state.kCastleBlack === true &&
          next === 'g8' &&
          state.f['8'][0] === ''
        ) {
          return true;
        }
        // queenside castle
        if (
          state.qCastleBlack === true &&
          next === 'c8' &&
          state.b['8'][0] === '' &&
          state.d['8'][0] === ''
        ) {
          return true;
        }
      }

      // standard movements
      if (
        (+curr[1] === +next[1] ||
          +curr[1] === +next[1] + 1 ||
          +curr[1] === +next[1] - 1) &&
        (currLetterIndex === nextLetterIndex ||
          currLetterIndex === nextLetterIndex + 1 ||
          currLetterIndex === nextLetterIndex - 1)
      )
        return true;
    }
    return false;
  };

  const resetState = () => {
    setboardState(initialState);
    stateList = [];
  };

  const undoState = () => {
    if (stateList.length !== 0) {
      if (stateList.length === 1) {
        stateList.pop();
        setboardState(initialState);
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
