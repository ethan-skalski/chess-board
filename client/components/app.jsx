import React, { useState } from 'react';
import Board from './board.jsx';
import initialState from '../initialState.js';
import moveLogic from '../moveLogic.js';

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

      // check if an enpassant occurred
      const enPassant = newBoardState[target.id[0]][target.id[1]][3] === 'e';

      // removes piece from previously selected square and reverts border to black
      newBoardState[focus.id[0]][focus.id[1]] = ['', '', 'b'];
      // assigns stored piece to currently selected square
      newBoardState[target.id[0]][target.id[1]] =
        boardState[focus.id[0]][focus.id[1]];
      // assign selected square border color to black
      newBoardState[target.id[0]][target.id[1]][2] = 'b';

      // handles pawn promotion and en passant
      if (newBoardState[target.id[0]][target.id[1]][0] === 'P') {
        // removes captured pawn if en passant
        if (enPassant) {
          if (newBoardState[target.id[0]][target.id[1]][1] === 'w')
            newBoardState[target.id[0]]['5'] = ['', '', 'b', ''];
          if (newBoardState[target.id[0]][target.id[1]][1] === 'b')
            newBoardState[target.id[0]]['4'] = ['', '', 'b', ''];
        } else {
          for (let x in newBoardState) {
            if (typeof newBoardState[x] === 'object') {
              newBoardState[x]['3'][3] = '';
              newBoardState[x]['6'][3] = '';
            }
          }
        }

        // track double move
        if (focus.id[1] === '2' && target.id[1] === '4') {
          newBoardState[focus.id[0]]['3'][3] = 'e';
        } else if (focus.id[1] === '7' && target.id[1] === '5') {
          newBoardState[focus.id[0]]['6'][3] = 'e';
        }

        // promotion check
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
      } else {
        for (let x in newBoardState) {
          if (typeof newBoardState[x] === 'object') {
            newBoardState[x]['3'][3] = '';
            newBoardState[x]['6'][3] = '';
          }
        }
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
        if (focus.id === 'e8') {
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
        <button onClick={resetState}>Reset</button>
        <button onClick={undoState}>Undo</button>
      </div>
    </div>
  );
};

// allows access in index.js
export default App;
