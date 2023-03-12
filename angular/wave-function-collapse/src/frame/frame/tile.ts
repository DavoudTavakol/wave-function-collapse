class Tile {
  img: HTMLImageElement;
  id: number;
  up: number;
  right: number;
  down: number;
  left: number;
  rotation: number = 0;

  constructor(
    id: number,
    img: HTMLImageElement,
    up: number,
    right: number,
    down: number,
    left: number
  ) {
    this.img = img;
    this.id = id;
    this.up = up;
    this.right = right;
    this.down = down;
    this.left = left;
  }

  rotateTile(rotation: number) {
    if (rotation === 90) {
      this.rotation = rotation;
      this.rotateSockets();
    } else if (rotation === 180) {
      this.rotation = rotation;
      this.rotateSockets();
      this.rotateSockets();
    } else if (rotation === 270) {
      this.rotation = rotation;
      this.rotateSockets();
      this.rotateSockets();
      this.rotateSockets();
    } else {
      console.log('WRONG ROTATION! 90,180,270 allowed!');
    }
  }

  rotateSockets() {
    const tmpLeft = this.left;
    this.left = this.down;
    this.down = this.right;
    this.right = this.up;
    this.up = tmpLeft;
  }
}

export { Tile };
