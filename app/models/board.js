const Cell = require('./cell');

class Board {
  constructor() {
    this.cells = this._initializeCells();
    this.addDiamonds();
    this.revealedDiamonds = 0;
    this.unopenedCells = 64;
    this.gameOver = false;
  }

  _initializeCells() {
    const cells = [];
    let cellId = 0;
    for (let i = 0; i < 8; i += 1) {
      cells[i] = [];
      for (let j = 0; j < 8; j += 1) {
        cells[i].push(new Cell(cellId));
        cellId += 1;
      }
    }
    return cells;
  }

  _getCell(xIndex, yIndex) {
    return this.cells[xIndex][yIndex];
  }

  revealDiamond() {
    this.revealedDiamonds += 1;

    if (this.revealedDiamonds === 8) {
      this.gameOver = true;
    }
  }

  findCell(id) {
    const xIndex = parseInt(id / 8, 10);
    const yIndex = id % 8;

    this.unopenedCells -= 1;
    return this._getCell(xIndex, yIndex);
  }

  _findCoordinates() {
    return ({
      xIndex: Math.floor(Math.random() * 8),
      yIndex: Math.floor(Math.random() * 8),
    });
  }

  addDiamonds() {
    let diamondCount = 0;
    while (diamondCount < 8) {
      const { xIndex, yIndex } = this._findCoordinates();
      const status = this._getCell(xIndex, yIndex).addDiamond();

      if (status) {
        diamondCount += 1;
      }
    }
  }
}

module.exports = Board;
