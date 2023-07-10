import { Tile } from '../tile';

export let landTiles = []

    landTiles[0] = new Tile(
      0,
      'assets/images/land/0.png',
      'AA',
      'AA',
      'AA',
      'AA'
    );
    landTiles[1] = new Tile(
      1,
      'assets/images/land/1.png',
      'BA',
      'AA',
      'AB',
      'BB'
    );
    landTiles[2] = new Tile(
      2,
      'assets/images/land/2.png',
      'CB',
      'BB',
      'BC',
      'CC'
    );
    landTiles[3] = new Tile(
      3,
      'assets/images/land/3.png',
      'CC',
      'CC',
      'CC',
      'CC'
    );
    landTiles[4] = new Tile(
      4,
      'assets/images/land/4.png',
      'CC',
      'CC',
      'CC',
      'CC'
    );
    landTiles[5] = new Tile(
      5,
      'assets/images/land/5.png',
      'BB',
      'BA',
      'AB',
      'BB'
    );
    landTiles[6] = new Tile(
      6,
      'assets/images/land/6.png',
      'AA',
      'AA',
      'AB',
      'BA'
    );
    landTiles[7] = new Tile(
      7,
      'assets/images/land/7.png',
      'CC',
      'CB',
      'BC',
      'CC'
    );
    landTiles[8] = new Tile(
      8,
      'assets/images/land/8.png',
      'BB',
      'BB',
      'BC',
      'CB'
    );
    
    landTiles[9] = landTiles[1].rotateTile(9, 90);
    landTiles[10] = landTiles[1].rotateTile(10, 180);
    landTiles[11] = landTiles[1].rotateTile(11, 270);
    landTiles[12] = landTiles[2].rotateTile(12, 90);
    landTiles[13] = landTiles[2].rotateTile(13, 180);
    landTiles[14] = landTiles[2].rotateTile(14, 270);
    landTiles[15] = landTiles[5].rotateTile(15, 90);
    landTiles[16] = landTiles[5].rotateTile(16, 180);
    landTiles[17] = landTiles[5].rotateTile(17, 270);
    landTiles[18] = landTiles[6].rotateTile(18, 90);
    landTiles[19] = landTiles[6].rotateTile(19, 180);
    landTiles[20] = landTiles[6].rotateTile(20, 270);
    landTiles[21] = landTiles[7].rotateTile(21, 90);
    landTiles[22] = landTiles[7].rotateTile(22, 180);
    landTiles[23] = landTiles[7].rotateTile(23, 270);
    landTiles[24] = landTiles[8].rotateTile(24, 90);
    landTiles[25] = landTiles[8].rotateTile(25, 180);
    landTiles[26] = landTiles[8].rotateTile(26, 270);

    
