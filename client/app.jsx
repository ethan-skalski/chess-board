import React, { useState, useEffect, Component } from 'react';

const matrix = {
  a: {
    1: ['R', 'w'],
    2: ['P', 'w'],
    3: ['', ''],
    4: ['', ''],
    5: ['', ''],
    6: ['', ''],
    7: ['P', 'b'],
    8: ['R', 'b'],
  },
  b: {
    1: ['N', 'w'],
    2: ['P', 'w'],
    3: ['', ''],
    4: ['', ''],
    5: ['', ''],
    6: ['', ''],
    7: ['P', 'b'],
    8: ['N', 'b'],
  },
  c: {
    1: ['B', 'w'],
    2: ['P', 'w'],
    3: ['', ''],
    4: ['', ''],
    5: ['', ''],
    6: ['', ''],
    7: ['P', 'b'],
    8: ['B', 'b'],
  },
  d: {
    1: ['Q', 'w'],
    2: ['P', 'w'],
    3: ['', ''],
    4: ['', ''],
    5: ['', ''],
    6: ['', ''],
    7: ['P', 'b'],
    8: ['Q', 'b'],
  },
  e: {
    1: ['K', 'w'],
    2: ['P', 'w'],
    3: ['', ''],
    4: ['', ''],
    5: ['', ''],
    6: ['', ''],
    7: ['P', 'b'],
    8: ['K', 'b'],
  },
  f: {
    1: ['B', 'w'],
    2: ['P', 'w'],
    3: ['', ''],
    4: ['', ''],
    5: ['', ''],
    6: ['', ''],
    7: ['P', 'b'],
    8: ['B', 'b'],
  },
  g: {
    1: ['N', 'w'],
    2: ['P', 'w'],
    3: ['', ''],
    4: ['', ''],
    5: ['', ''],
    6: ['', ''],
    7: ['P', 'b'],
    8: ['N', 'b'],
  },
  h: {
    1: ['R', 'w'],
    2: ['P', 'w'],
    3: ['', ''],
    4: ['', ''],
    5: ['', ''],
    6: ['', ''],
    7: ['P', 'b'],
    8: ['R', 'b'],
  },
};

const App = () => {
  return (
    <>
      <div>
        <h1>Solo Project: A Pathetic Attempt at Chess</h1>
      </div>
      <div>
        <Board />
      </div>
    </>
  );
};

const Board = () => {
  const [boardState, setboardState] = useState(matrix);

  const grid = [];
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  let sqColor;
  for (let num = 8; num > 0; num--) {
    const row = [];
    if (num % 2 === 0) sqColor = 'gainsboro';
    else sqColor = 'gray';
    for (let lett = 0; lett < 8; lett++) {
      const coords = letters[lett] + num;
      let piece = '',
        pColor = 'black';
      if (matrix[coords[0]][coords[1]]) {
        piece = matrix[coords[0]][coords[1]][0];
        if (matrix[coords[0]][coords[1]][1] === 'w') {
          pColor = 'white';
        }
      }
      row.push(
        <Square id={coords} sqColor={sqColor} piece={piece} pColor={pColor} />
      );
      if (sqColor === 'gainsboro') sqColor = 'gray';
      else sqColor = 'gainsboro';
    }
    grid.push(<div>{row}</div>);
  }
  return grid;
};

const Square = (props) => {
  return (
    <button
      style={{
        height: '70px',
        width: '70px',
        border: 'solid',
        borderColor: 'black',
        fontSize: '30px',
        color: props.pColor,
        backgroundColor: props.sqColor,
      }}
      id={props.id}
      key={props.id}
    >
      {props.piece}
    </button>
  );
};

export default App;
