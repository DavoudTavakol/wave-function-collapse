import { Tile } from '../tile';

export let circleTiles = []

circleTiles[0] = new Tile(
  0,
  'assets/images/circles/circle-black.png',
  'A',
  'A',
  'A',
  'A'
);
circleTiles[1] = new Tile(
  1,
  'assets/images/circles/circle-blackdoublehalf.png',
  'A',
  'B',
  'A',
  'B'
);
circleTiles[2] = new Tile(
  2,
  'assets/images/circles/circle-blackhalf.png',
  'A',
  'B',
  'B',
  'B'
);
circleTiles[3] = new Tile(
  3,
  'assets/images/circles/circle-blackquarter.png',
  'B',
  'A',
  'A',
  'B'
);
circleTiles[4] = new Tile(
  4,
  'assets/images/circles/circle-white.png',
  'B',
  'B',
  'B',
  'B'
);
circleTiles[5] = new Tile(
  5,
  'assets/images/circles/circle-whitedoublehalf.png',
  'B',
  'A',
  'B',
  'A'
);
circleTiles[6] = new Tile(
  6,
  'assets/images/circles/circle-whitehalf.png',
  'A',
  'A',
  'B',
  'A'
);
circleTiles[7] = new Tile(
  7,
  'assets/images/circles/circle-whitequarter.png',
  'B',
  'B',
  'A',
  'A'
);

circleTiles[8] = circleTiles[1].rotateTile(8, 90);
circleTiles[9] = circleTiles[2].rotateTile(9, 90);
circleTiles[10] = circleTiles[2].rotateTile(10, 180);
circleTiles[11] = circleTiles[2].rotateTile(11, 270);
circleTiles[12] = circleTiles[3].rotateTile(12, 90);
circleTiles[13] = circleTiles[3].rotateTile(13, 180);
circleTiles[14] = circleTiles[3].rotateTile(14, 270);
circleTiles[15] = circleTiles[5].rotateTile(15, 90);
circleTiles[16] = circleTiles[6].rotateTile(16, 90);
circleTiles[17] = circleTiles[6].rotateTile(17, 180);
circleTiles[18] = circleTiles[6].rotateTile(18, 270);
circleTiles[19] = circleTiles[7].rotateTile(19, 90);
circleTiles[20] = circleTiles[7].rotateTile(20, 180);
circleTiles[21] = circleTiles[7].rotateTile(21, 270);