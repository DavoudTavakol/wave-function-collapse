import { Tile } from '../tile';

export let purpleMazeTiles = []

purpleMazeTiles[0] = new Tile(
  0,
  'assets/images/purple-maze/0.png',
  'AA',
  'AB',
  'BA',
  'AA'
);
purpleMazeTiles[1] = new Tile(
  1,
  'assets/images/purple-maze/1.png',
  'AA',
  'AB',
  'BB',
  'BA'
);
purpleMazeTiles[2] = new Tile(
  2,
  'assets/images/purple-maze/2.png',
  'BB',
  'BC',
  'CB',
  'BB'
);

purpleMazeTiles[3] = purpleMazeTiles[0].rotateTile(3, 90);
purpleMazeTiles[4] = purpleMazeTiles[0].rotateTile(4, 180);
purpleMazeTiles[5] = purpleMazeTiles[0].rotateTile(5, 270);
purpleMazeTiles[6] = purpleMazeTiles[1].rotateTile(6, 90);
purpleMazeTiles[7] = purpleMazeTiles[1].rotateTile(7, 180);
purpleMazeTiles[8] = purpleMazeTiles[1].rotateTile(8, 270);
purpleMazeTiles[9] = purpleMazeTiles[2].rotateTile(9, 90);
purpleMazeTiles[10] = purpleMazeTiles[2].rotateTile(10, 180);
purpleMazeTiles[11] = purpleMazeTiles[2].rotateTile(11, 270);


    
