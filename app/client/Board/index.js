import React, { Component } from 'react';

import { getGameData, revealCell } from 'Api';
import Cell from 'Cell';

class Board extends Component {
  state = {
    cells: [],
    gameOver: false,
    score: 0,
  }

  componentDidMount() {
    getGameData().then((response) => {
      this.setState({ ...response });
    });
  }

  handleClick = (event) => {
    if (this.state.gameOver) return;

    const { id } = event.target;
    revealCell(id).then((response) => {
      this.setState({ ...response });
    });
  }

  render() {
    const { cells, gameOver, score } = this.state;
    const styles = {
      textAlign: 'center',
      color: 'red',
      fontWeight: 'bold',
    };

    const template = cells.map(innerCells =>
      innerCells.map(cell =>
        (<Cell key={cell.id} id={cell.id} handleClick={this.handleClick} className={`cell ${cell.image}`} />)));

    const gameOverMessage = gameOver ? (<p style={styles}> Game over!! Your score is: {score} </p>) : '';

    return (
      <div className="wrapper">
        {gameOverMessage}
        <div className="diamondsweeper-board">
          {template}
        </div>
      </div>
    );
  }
}

export default Board;
