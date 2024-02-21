import React, { useState, useEffect } from 'react';

const startingPieces = {
  a1: ['R', 'w'],
  b1: ['N', 'w'],
  c1: ['B', 'w'],
  d1: ['Q', 'w'],
  e1: ['K', 'w'],
  f1: ['B', 'w'],
  g1: ['N', 'w'],
  h1: ['R', 'w'],
  a2: ['P', 'w'],
  b2: ['P', 'w'],
  c2: ['P', 'w'],
  d2: ['P', 'w'],
  e2: ['P', 'w'],
  f2: ['P', 'w'],
  g2: ['P', 'w'],
  h2: ['P', 'w'],
  a8: ['R', 'b'],
  b8: ['N', 'b'],
  c8: ['B', 'b'],
  d8: ['Q', 'b'],
  e8: ['K', 'b'],
  f8: ['B', 'b'],
  g8: ['N', 'b'],
  h8: ['R', 'b'],
  a7: ['P', 'b'],
  b7: ['P', 'b'],
  c7: ['P', 'b'],
  d7: ['P', 'b'],
  e7: ['P', 'b'],
  f7: ['P', 'b'],
  g7: ['P', 'b'],
  h7: ['P', 'b'],
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
      if (startingPieces[coords]) {
        piece = startingPieces[coords][0];
        if (startingPieces[coords][1] === 'w') {
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
