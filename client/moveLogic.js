// checks if a move is legal
const moveLogic = (state, curr, next) => {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const currPiece = state[curr[0]][curr[1]][0];
  const currColor = state[curr[0]][curr[1]][1];
  const currLetterIndex = letters.indexOf(curr[0]);
  const nextPiece = state[next[0]][next[1]][0];
  const nextLetterIndex = letters.indexOf(next[0]);

  // pawn logic
  if (currPiece === 'P') {
    // separate logic for white
    if (currColor === 'w') {
      if (
        (currLetterIndex === nextLetterIndex + 1 ||
          currLetterIndex === nextLetterIndex - 1) &&
        `${+curr[1] + 1}` === next[1]
      ) {
        if (nextPiece !== '' || state[next[0]][next[1]][3] === 'e') return true;
      }
      if (curr[0] === next[0] && curr[1] === '2' && next[1] === '4')
        return true;
      if (curr[0] === next[0] && `${+curr[1] + 1}` === next[1]) return true;
      return false;
    }
    // separate logic for black
    if (currColor === 'b') {
      if (
        (currLetterIndex === nextLetterIndex + 1 ||
          currLetterIndex === nextLetterIndex - 1) &&
        `${+curr[1] - 1}` === next[1]
      ) {
        if (nextPiece !== '' || state[next[0]][next[1]][3] === 'e') return true;
      }
      if (curr[0] === next[0] && curr[1] === '7' && next[1] === '5')
        return true;
      if (curr[0] === next[0] && `${+curr[1] - 1}` === next[1]) return true;
      return false;
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
        while (track[0] !== nextLetterIndex - 1 && track[1] !== +next[1] - 1) {
          track[0] += 1;
          track[1] += 1;
          if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
        }
        return true;
      }
      // up/left logic
      if (+curr[1] < +next[1] && currLetterIndex > nextLetterIndex) {
        track = [currLetterIndex, +curr[1]];
        while (track[0] !== nextLetterIndex + 1 && track[1] !== +next[1] - 1) {
          track[0] -= 1;
          track[1] += 1;
          if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
        }
        return true;
      }
      // down/right logic
      if (+curr[1] > +next[1] && currLetterIndex < nextLetterIndex) {
        track = [currLetterIndex, +curr[1]];
        while (track[0] !== nextLetterIndex - 1 && track[1] !== +next[1] + 1) {
          track[0] += 1;
          track[1] -= 1;
          if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
        }
        return true;
      }
      // down/left logic
      if (+curr[1] > +next[1] && currLetterIndex > nextLetterIndex) {
        track = [currLetterIndex, +curr[1]];
        while (track[0] !== nextLetterIndex + 1 && track[1] !== +next[1] + 1) {
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
        while (track[0] !== nextLetterIndex - 1 && track[1] !== +next[1] - 1) {
          track[0] += 1;
          track[1] += 1;
          if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
        }
        return true;
      }
      // up/left logic
      if (+curr[1] < +next[1] && currLetterIndex > nextLetterIndex) {
        track = [currLetterIndex, +curr[1]];
        while (track[0] !== nextLetterIndex + 1 && track[1] !== +next[1] - 1) {
          track[0] -= 1;
          track[1] += 1;
          if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
        }
        return true;
      }
      // down/right logic
      if (+curr[1] > +next[1] && currLetterIndex < nextLetterIndex) {
        track = [currLetterIndex, +curr[1]];
        while (track[0] !== nextLetterIndex - 1 && track[1] !== +next[1] + 1) {
          track[0] += 1;
          track[1] -= 1;
          if (state[letters[track[0]]][`${track[1]}`][0] !== '') return false;
        }
        return true;
      }
      // down/left logic
      if (+curr[1] > +next[1] && currLetterIndex > nextLetterIndex) {
        track = [currLetterIndex, +curr[1]];
        while (track[0] !== nextLetterIndex + 1 && track[1] !== +next[1] + 1) {
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

export default moveLogic;
