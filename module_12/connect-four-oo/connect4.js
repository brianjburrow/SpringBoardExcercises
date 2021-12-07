/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// taking a check for valid css function from stackexchange
// https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color

const isColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
}

class Player {
  constructor(str) {
    this.color = str
  }
}

class Game {
  constructor(WIDTH, HEIGHT, colorP1, colorP2) {
    this.WIDTH = 7;
    this.HEIGHT = 6;
    this.board = [];
    this.isGameOver = false;
    this.htmlBoard = document.getElementById('board');
    console.log(this.htmlBoard);
    this.playerColor = { 1: 'red', 2: 'blue' };
    this.player1 = (colorP1 && isColor(colorP1)) ? new Player(colorP1) : new Player('red')
    this.player2 = (colorP2 && isColor(colorP2)) ? new Player(colorP2) : new Player('blue')
    this.currPlayer = this.player1;
    console.log(this.playerColor);
    this.makeBoard();
    this.makeHtmlBoard();
  }

  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(new Array(this.WIDTH).fill(null));
    }
  }
  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    this.htmlBoard.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');
      row.classList.add('gameRow');
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      this.htmlBoard.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */

  endGame(msg) {
    this.isGameOver = true;
    alert(msg);
  }

  /** handleClick: handle click of column top to play piece */

  handleClick(evt) {
    // get x from ID of clicked cell
    if (this.isGameOver) return
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);

    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      let playerNum = this.currPlayer === this.player1 ? 1 : 2
      return this.endGame(`Player ${playerNum} won!`);
    }

    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    // switch players
    this.currPlayer = this.currPlayer === this.player1 ? this.player2 : this.player1;
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    let _win = (cells) => {
      // to allow for correct this
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}


let gb;
let header = document.querySelector('header')
header.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(event)
  let gameInProgress = document.querySelector('#column-top')
  if (event.target.nodeName === "BUTTON") {
    if (gameInProgress) gb.htmlBoard.innerHTML = '';
    let colorP1 = document.querySelector("#colorP1").value;
    let colorP2 = document.querySelector("#colorP2").value;
    gb = new Game(6, 7, colorP1, colorP2);
  }
})

