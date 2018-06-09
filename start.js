const express = require('express');

const app = express();

const Board = require('./app/models/board');

app.set('view engine', 'ejs');
app.use(express.static('public'));

const board = new Board();

app.get('/', (req, res) => {
  res.render('home/index', {
    cells: board.cells,
    gameOver: board.gameOver,
    score: board.unopenedCells,
  });
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const diamondFound = board.findCell(id).reveal();

  if (diamondFound) {
    board.revealDiamond();
  }
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!'); /* eslint-disable-line no-console */
});
