import { Tile } from './tile';

class Cell {
  collapsed: boolean = false;
  options: Tile[] = [];

  constructor(tiles: Tile[]) {
    this.options = tiles;
  }
}

export { Cell };
