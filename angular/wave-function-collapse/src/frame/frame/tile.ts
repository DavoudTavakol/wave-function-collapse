class Tile {
  img: HTMLImageElement = new Image();
  id: number;
  up: string;
  right: string;
  down: string;
  left: string;
  rotation: number = 0;

  constructor(
    id: number,
    src: string,
    up: string,
    right: string,
    down: string,
    left: string
  ) {
    this.img.src = src;
    this.id = id;
    this.up = up;
    this.right = right;
    this.down = down;
    this.left = left;
  }

  rotateTile(id: number, rotation: number) {
    let newTile;
    switch (rotation) {
      case 90:
        newTile = new Tile(
          id,
          this.img.src,
          this.left,
          this.up,
          this.right,
          this.down
        );
        this.checkRotation(newTile, rotation);
        break;
      case 180:
        newTile = new Tile(
          id,
          this.img.src,
          this.down,
          this.left,
          this.up,
          this.right
        );
        this.checkRotation(newTile, rotation);
        break;
      case 270:
        newTile = new Tile(
          id,
          this.img.src,
          this.right,
          this.down,
          this.left,
          this.up
        );
        this.checkRotation(newTile, rotation);
        break;
    }
    return newTile;
  }

  checkRotation(newTile: Tile, rotation: number) {
    if(this.rotation + rotation >= 360) {
      newTile.rotation = this.rotation + rotation - 360;
    } else {
      newTile.rotation = this.rotation + rotation;
    }
  }
  
}


export { Tile };
