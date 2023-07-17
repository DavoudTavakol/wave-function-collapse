import { Tile } from '../tile';

export let roomTiles = []

roomTiles[0] = new Tile(
  0,
  'assets/images/rooms/0.png',
  'AAA',
  'AAA',
  'AAA',
  'AAA'
);
roomTiles[1] = new Tile(
  1,
  'assets/images/rooms/1.png',
  'AAA',
  'ABA',
  'ABA',
  'AAA'
);
roomTiles[2] = new Tile(
  2,
  'assets/images/rooms/2.png',
  'ABA',
  'AAA',
  'ABA',
  'AAA'
);
roomTiles[3] = new Tile(
  3,
  'assets/images/rooms/3.png',
  'AAB',
  'BBB',
  'BAA',
  'AAA'
);
roomTiles[4] = new Tile(
  4,
  'assets/images/rooms/4.png',
  'AAB',
  'BBB',
  'BAA',
  'ABA'
);
roomTiles[5] = new Tile(
  5,
  'assets/images/rooms/5.png',
  'AAB',
  'BAA',
  'AAA',
  'AAA'
);
roomTiles[6] = new Tile(
  6,
  'assets/images/rooms/6.png',
  'ABA',
  'AAA',
  'ABA',
  'ABA'
);
roomTiles[7] = new Tile(
  7,
  'assets/images/rooms/7.png',
  'BBB',
  'BBB',
  'BBB',
  'BBB'
);

roomTiles[8] = new Tile(
  8,
  'assets/images/rooms/8.png',
  'BBB',
  'BBB',
  'BAA',
  'AAB'
);

roomTiles[9] = roomTiles[1].rotateTile(9, 90);
roomTiles[10] = roomTiles[1].rotateTile(10, 180);
roomTiles[11] = roomTiles[1].rotateTile(11, 270);
roomTiles[12] = roomTiles[2].rotateTile(12, 180);
roomTiles[13] = roomTiles[3].rotateTile(13, 90);
roomTiles[14] = roomTiles[3].rotateTile(14, 180);
roomTiles[15] = roomTiles[3].rotateTile(15, 270);
roomTiles[16] = roomTiles[4].rotateTile(16, 90);
roomTiles[17] = roomTiles[4].rotateTile(17, 180);
roomTiles[18] = roomTiles[4].rotateTile(18, 270);
roomTiles[19] = roomTiles[5].rotateTile(19, 90);
roomTiles[20] = roomTiles[5].rotateTile(20, 180);
roomTiles[21] = roomTiles[5].rotateTile(21, 270);
roomTiles[22] = roomTiles[6].rotateTile(22, 90);
roomTiles[23] = roomTiles[6].rotateTile(23, 180);
roomTiles[24] = roomTiles[6].rotateTile(24, 270);
roomTiles[25] = roomTiles[8].rotateTile(25, 90);
roomTiles[26] = roomTiles[8].rotateTile(26, 180);
roomTiles[27] = roomTiles[8].rotateTile(27, 270);