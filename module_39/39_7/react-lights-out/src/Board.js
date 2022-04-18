import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    let row;
    // TODO: create array-of-arrays of true/false values
    for (let iRow = 0; iRow < nrows; iRow++){
      row = [];
      for (let iCol = 0; iCol < ncols; iCol++){
        row.push(Math.random() < chanceLightStartsOn ? true : false);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row=>row.every(bool => !bool))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const deepCopyBoard = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(x, y, deepCopyBoard);
      flipCell(x-1, y, deepCopyBoard);
      flipCell(x, y-1, deepCopyBoard);
      flipCell(x+1, y, deepCopyBoard);
      flipCell(x, y+1, deepCopyBoard);
      // TODO: return the copy
      return deepCopyBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()){
    return <div>You won</div>
  } else {
    // make table board
    return (
      <table>
        <tbody>
      {board.map((row, rowI) => {
        return (
      <tr key={`row-${rowI}`}>
        {row.map((bool, colJ) => <Cell key={`${colJ}-${rowI}`} flipCellsAroundMe={()=>flipCellsAround(`${colJ}-${rowI}`)} isLit={bool}/>)}
      </tr>
        )
      }
    )
  }
  </tbody>
</table>
  )
  }
}

export default Board;
