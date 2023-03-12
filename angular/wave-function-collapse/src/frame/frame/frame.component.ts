import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Tile } from './tile';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements OnInit {
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;

  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  tiles: Tile[] = [];

  srcUrl: string[] = [
    'assets/images/base/0.png',
    'assets/images/base/1.png',
    'assets/images/base/2.png',
    'assets/images/base/3.png',
    'assets/images/base/4.png',
    'assets/images/base/5.png',
  ];

  DIM: number = 10;
  tileSize: number = 50;
  canvasWidth: number = this.DIM * this.tileSize;
  canvasHeight: number = this.DIM * this.tileSize;
  grid: any = [];
  done: boolean = false;

  constructor() {}

  //YOU CANT DRAW IMAGES HERE SINCE NOT PRELOADED
  //BUT YOU CAN DO LOGIC
  ngOnInit(): void {
    this.canvas = this.myCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.drawGrid(this.ctx);

    console.dir('STARTING..');
    this.preload(this.srcUrl, this.tiles);

    //Filling Grid
    for (let i = 0; i < this.DIM * this.DIM; i++) {
      this.grid[i] = {
        collapsed: false,
        options: [
          this.tiles[0],
          this.tiles[1],
          this.tiles[2],
          this.tiles[3],
          this.tiles[4],
          this.tiles[5],
        ],
      };
    }
  }

  //YOU CAN DRAW IMAGES HERE NOW SINCE ALL PRELOADED
  init() {
    ////Pick cell/cells with least entropy (sort all the cells then pick. if all same => pick random)
    //sort grid by # of options

    let gridCopy = [...this.grid];
    gridCopy = gridCopy.filter((a) => !a.collapsed);

    //all is collapsed
    if (gridCopy.length === 0) {
      this.done = true;
      console.log('ALL COLAB');
      return;
    }

    gridCopy.sort((a: any, b: any) => {
      return a.options.length - b.options.length;
    });

    //find index with all the lowest entropy cells
    //gridcopy[0] because we sorted it and the first cell should habe the fewest options.
    let lowestOptionNr = gridCopy[0].options.length;
    let cellPick = 0;
    for (let i = 1; i < gridCopy.length; i++) {
      //i = 1 because we dont need to compare with himself at gridCopy[0] if i = 0 were used
      if (gridCopy[i].options.length > lowestOptionNr) {
        cellPick = i;
        break;
      }
    }

    //remove all other cells
    if (cellPick > 0) gridCopy.splice(cellPick);
    //pick random cell
    const cell = gridCopy[this.getRandomInt(gridCopy.length)];
    //collapse cell
    cell.collapsed = true;
    //pick random option
    let pick = cell.options[this.getRandomInt(cell.options.length)];

    if (pick === undefined) {
      console.log('UNDEFINED PICK');
      this.ngOnInit();
      return;
    }
    //replace option in cell
    cell.options = [pick];

    //go through all of the grid and draw cell IF its collapsed!
    for (let j = 0; j < this.DIM; j++) {
      for (let i = 0; i < this.DIM; i++) {
        let tempCell = this.grid[i + j * this.DIM];
        if (tempCell.collapsed) {
          this.imageDraw(
            tempCell.options[0],
            i * this.tileSize,
            j * this.tileSize
          );
        }
      }
    }

    //update next gen tiles
    const nextGrid = [];
    for (let j = 0; j < this.DIM; j++) {
      for (let i = 0; i < this.DIM; i++) {
        let index = i + j * this.DIM;
        if (this.grid[index].collapsed) {
          nextGrid[index] = this.grid[index];
        } else {
          let validTiles: Tile[] = [];
          let allOptions: number[] = [0, 1, 2, 3, 4, 5];
          //checktop
          if (j > 0) {
            let upCell = this.grid[i + (j - 1) * this.DIM];
            let validOptions: number[] = [];
            //get valid sockets from cell ontop
            //change: get valid TILES which are those with correct SOCKETS
            for (let options of upCell.options) {
              let valid = options.down;
              //get tiles with valid socket
              for(let i = 0; i < this.tiles.length; i++) {
                if(this.tiles[i].up === valid) {
                  validOptions = validOptions.concat(this.tiles[i].id);
                }
              }
            }

            //allOpt (id of tiles) = 0,1,2,3,4,5
            //validOptions(sockets: numbers) all allowed sockets
            checkValid(allOptions, validOptions);
          }
          //checkright
          if (i < this.DIM - 1) {
            let rightCell = this.grid[i + 1 + j * this.DIM];
            let validOptions: number[] = [];
            for (let options of rightCell.options) {
              let valid = options.left;
              for(let i = 0; i < this.tiles.length; i++) {
                if(this.tiles[i].right === valid) {
                  validOptions = validOptions.concat(this.tiles[i].id);
                }
              }
            }
            checkValid(allOptions, validOptions);
          }
          //checkdown
          if (j < this.DIM - 1) {
            let downCell = this.grid[i + (j + 1) * this.DIM];
            let validOptions: number[] = [];
            for (let options of downCell.options) {
              let valid = options.up;
              for(let i = 0; i < this.tiles.length; i++) {
                if(this.tiles[i].down === valid) {
                  validOptions = validOptions.concat(this.tiles[i].id);
                }
              }
            }
            checkValid(allOptions, validOptions);
          }
          //checkleft
          if (i > 0) {
            let leftCell = this.grid[i - 1 + j * this.DIM];
            let validOptions: number[] = [];
            for (let options of leftCell.options) {
              let valid = options.right;
              for(let i = 0; i < this.tiles.length; i++) {
                if(this.tiles[i].left === valid) {
                  validOptions = validOptions.concat(this.tiles[i].id);
                }
              }
            }
            checkValid(allOptions, validOptions);
          }

          for (let i = 0; i < allOptions.length; i++) {
            validTiles.push(this.tiles[allOptions[i]]);
          }

          //create new cell with new options at current pos.
          nextGrid[index] = {
            collapsed: false,
            options: [],
          };
          nextGrid[index].options = validTiles;
          nextGrid[index].collapsed = false;
        }
      }
    }
    this.grid = nextGrid;

    function checkValid(allOpt: number[], validOptions: number[]) {
      for (let i = allOpt.length - 1; i >= 0; i--) {
        if (!validOptions.includes(allOpt[i])) {
          allOpt.splice(i, 1);
        }
      }
    }
  }

  imageDraw(tile: Tile, x: number, y: number) {
    if (tile.rotation === 90) {
      let temp = x;
      x = y;
      y = -temp - this.tileSize;
      this.ctx.rotate((tile.rotation * Math.PI) / 180);
    }
    if (tile.rotation === 180) {
      x = -x - this.tileSize;
      y = -y - this.tileSize;
      this.ctx.rotate((tile.rotation * Math.PI) / 180);
    }
    if (tile.rotation === 270) {
      let temp = x;
      x = -y - this.tileSize;
      y = temp;
      this.ctx.rotate((tile.rotation * Math.PI) / 180);
    }
    this.ctx.drawImage(tile.img, x, y);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  onClick() {
    while (this.done === false) {
      this.init();
    }
  }

  //TODO: CREATE NEW CHECKVALID METHOD FOR NEW SOCKETS!
  //TODO2: Check rotated tile creation + constraints!
  //rework preload

  preload(urls: string[], tiles: any) {
    let loaded = 1;
    //create tiles with sockets
    tiles[0] = new Tile(0, new Image(), 0, 0, 0, 0);
    tiles[1] = new Tile(1, new Image(), 1, 1, 0, 0);
    tiles[2] = new Tile(2, new Image(), 1, 1, 1, 0);
    tiles[3] = new Tile(3, new Image(), 0, 1, 0, 0);
    tiles[4] = new Tile(4, new Image(), 1, 0, 1, 0);
    tiles[5] = new Tile(5, new Image(), 0, 1, 0, 1);

    //fill tiles with imgsrc
    for (let i = 0; i < urls.length; i++) {
      tiles[i].img.src = urls[i];
      tiles[i].img.onload = function () {
        if (loaded === urls.length) {
          console.dir('ALL IMAGES PRELOADED');
        }
        loaded++;
      };
    }
  }

  drawGrid(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.DIM; i++) {
      for (let j = 0; j < this.DIM; j++) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.strokeRect(
          i * this.tileSize,
          j * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
