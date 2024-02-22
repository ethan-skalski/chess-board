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

// lays out overall structure of the application
const App = () => {
  // handles rendering and rerendering on state change
  const [boardState, setboardState] = useState(matrix);

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
        />
      </div>
      <div>
        <button
          style={{ height: '70px', width: '400px', margin: '20px' }}
          onClick={() => setboardState(matrix)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// allows access in index.js
export default App;
