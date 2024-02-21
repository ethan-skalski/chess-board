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

let focus = '';

const App = () => {
  return (
    <>
      <div>
        <h1>Solo Project: An Attempt at Chess</h1>
      </div>
      <div>
        <Board />
      </div>
    </>
  );
};

const Board = () => {
  const [boardState, setboardState] = useState(matrix);

  const handleClick = (target) => {
    console.log(target.id);
    if (boardState[target.id[0]][target.id[1]][0] === '' && focus === '') {
      focus = '';
      console.log('BLANK');
    } else if (focus === '') {
      focus = target;
    } else {
      const newBoardState = JSON.parse(JSON.stringify(boardState));
      newBoardState[focus.id[0]][focus.id[1]] = ['', ''];
      newBoardState[target.id[0]][target.id[1]] =
        boardState[focus.id[0]][focus.id[1]];
      focus = '';
      setboardState(newBoardState);
    }
  };
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
        pColor;
      if (boardState[coords[0]][coords[1]]) {
        piece = boardState[coords[0]][coords[1]][0];
        if (boardState[coords[0]][coords[1]][1] === 'w') pColor = 'white';
        else if (boardState[coords[0]][coords[1]][1] === 'b') pColor = 'black';
        else pColor = '';
      }
      row.push(
        <Square
          id={coords}
          sqColor={sqColor}
          piece={piece}
          pColor={pColor}
          handleClick={handleClick}
        />
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
      onClick={(e) => props.handleClick(e.target)}
      id={props.id}
      key={props.id}
    >
      {props.piece}
    </button>
  );
};

export default App;
