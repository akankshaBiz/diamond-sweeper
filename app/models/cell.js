class Cell {
  constructor(id) {
    this.id = id;
    this.image = 'unknown';
    this.value = '';
  }

  addDiamond() {
    if (this.value === '') {
      this.value = 'diamond';
      return true;
    }
    return false;
  }

  reveal() {
    if (this.value === 'diamond') {
      this.image = 'diamond';
      return true;
    }

    this.image = '';
    return false;
  }
}

module.exports = Cell;
