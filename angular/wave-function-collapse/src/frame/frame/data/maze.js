import { Tile } from '../tile';

export let mazeTiles = []

mazeTiles[0] = new Tile(
  0,
  'assets/images/maze/0.png',
  'AAA',
  'AAA',
  'AAA',
  'AAA'
);
mazeTiles[1] = new Tile(
  1,
  'assets/images/maze/1.png',
  'ABA',
  'ABA',
  'AAA',
  'AAA'
);
mazeTiles[2] = new Tile(
  2,
  'assets/images/maze/2.png',
  'ABA',
  'ABA',
  'ABA',
  'AAA'
);

mazeTiles[3] = mazeTiles[1].rotateTile(3, 90);
mazeTiles[4] = mazeTiles[1].rotateTile(4, 180);
mazeTiles[5] = mazeTiles[1].rotateTile(5, 270);
mazeTiles[6] = mazeTiles[2].rotateTile(6, 90);
mazeTiles[7] = mazeTiles[2].rotateTile(7, 180);
mazeTiles[8] = mazeTiles[2].rotateTile(8, 270);


    
