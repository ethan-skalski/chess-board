import React, { useState, useEffect } from 'react';

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
  let color;
  for (let num = 8; num > 0; num--) {
    const row = [];
    if (num % 2 === 0) color = 'white';
    else color = 'gray';
    for (let lett = 0; lett < 8; lett++) {
      row.push(<Square id={letters[lett] + num} color={color} />);
      if (color === 'white') color = 'gray';
      else color = 'white';
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
        fontSize: '30px',
        backgroundColor: props.color,
      }}
      id={props.id}
      key={props.id}
    ></button>
  );
};

export default App;
