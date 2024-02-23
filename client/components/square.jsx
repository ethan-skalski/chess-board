import React from 'react';

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
      key={'sq' + props.id}
    >
      {/* {props.piece} */}
      <img src={props.img} id={props.id} key={'img' + props.id} />
    </div>
  );
};

export default Square;
