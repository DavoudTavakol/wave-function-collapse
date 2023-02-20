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
    'assets/images/0.png',
    'assets/images/1.png',
    'assets/images/2.png',
    'assets/images/3.png',
    'assets/images/4.png',
  ];

  DIM: number = 3;
  tileSize: number = 50;
  canvasWidth: number = this.DIM * this.tileSize;
  canvasHeight: number = this.DIM * this.tileSize;

  grid: any = [];

  constructor() {}

  //YOU CANT DRAW IMAGES HERE SINCE NOT PRELOADED
  //BUT YOU CAN DO LOGIC
  ngOnInit(): void {
    this.canvas = this.myCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;

    console.log(this.canvas);
    console.log(this.ctx);
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.drawGrid(this.ctx);
    this.preload(this.srcUrl, this.tiles);
  }

  //YOU CAN DRAW IMAGES HERE NOW SINCE ALL PRELOADED
  init() {
    console.dir('STARTING..');
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
        ],
      };
    }

    ////Pick cell/cells with least entropy (sort all the cells then pick. if all same => pick random)
    //sort grid by # of options
    const gridCopy = [...this.grid];
    gridCopy.sort((a: any, b: any) => {
      return a.options.length - b.options.length;
    });

    //find index with all the lowest entropy cells
    //gridcopy[0] because we sorted it and the first cell should habe the fewest options.
    let lowestOptionNr = gridCopy[0].length;
    let cellPick = 0;
    for (let i = 1; i < lowestOptionNr; i++) {
      //i = 1 because we dont need to compare with himself at gridCopy[0] if i = 0 were used
      if (gridCopy[i].option.length > lowestOptionNr) {
        cellPick = i;
        break;
      }
    }

    //remove all other cells
    if (lowestOptionNr > 0) gridCopy.splice(cellPick);
    //pick random cell
    const cell = gridCopy[this.getRandomInt(gridCopy.length)];
    //collapse cell
    cell.collapsed = true; //why is this happening first and manipulation the base grid???
    //pick random option
    let pick = cell.options[this.getRandomInt(cell.options.length)];
    //replace option in cell
    cell.options = [pick];

    //go through all of the grid and draw cell IF its collapsed!
    for (let i = 0; i < this.DIM; i++) {
      for (let j = 0; j < this.DIM; j++) {
        let tempCell = this.grid[i + j * this.DIM];
        if (tempCell.collapsed) {
          this.ctx.drawImage(
            tempCell.options[0].img,
            i * this.tileSize,
            j * this.tileSize
          );
        }
      }
    }

    //update next gen tiles
    let nextGrid = [];
    for (let i = 0; i < this.DIM; i++) {
      for (let j = 0; j < this.DIM; j++) {
        let index = i + j * this.DIM;
        if (this.grid[index].collapsed) {
          nextGrid[index] = this.grid[index];
          console.log(nextGrid[index]);
        } else {
          let validOptions: Tile[] = [];
          //checktop
          if (j > 0) {
            let upCell = this.grid[i + (j - 1) * this.DIM];
            for (let options of upCell.options) {
              validOptions.push(this.tiles[options.down]);
            }
          }
          //checkright
          if (i < this.DIM - 1) {
            let rightCell = this.grid[i + j + 1 * this.DIM];
            for (let options of rightCell.options) {
              validOptions.push(this.tiles[options.left]);
            }
          }
          //checkdown
          if (j < this.DIM - 1) {
            let downCell = this.grid[i + (j + 1) * this.DIM];
            for (let options of downCell.options) {
              validOptions.push(this.tiles[options.up]);
            }
          }
          //checkleft
          if (i > 1) {
            let leftCell = this.grid[i - 1 + j * this.DIM];
            for (let options of leftCell.options) {
              validOptions.push(this.tiles[options.right]);
            }
          }

          //validOption still wrong.
          //TODO: Logic. Fill the new grid at index with all valid TILES/Options from the valid OPTIONS (up, right, down, left) inside the CHECKED cell!
          console.log('meh: ' + validOptions);

          nextGrid[index] = {
            collapsed: false,
            options: [],
          };
          nextGrid[index].options = validOptions;
          nextGrid[index].collapsed = false;
        }
      }
    }
  }

  checkValid(options: Tile[], valid: number[]) {
    for (let i = options.length - 1; i >= 0; i--) {}
  }

  x: number = 0;
  y: number = 0;
  onClick() {
    this.ctx.drawImage(
      this.tiles[Math.floor(Math.random() * 4)].img,
      this.x,
      this.y
    );
    this.x = this.x + this.tileSize;
    if (this.x >= this.tileSize * this.DIM) {
      this.y = this.y + this.tileSize;
      this.x = 0;
    }
  }

  preload(urls: string[], tiles: any) {
    let loaded = 1;
    let _this = this;
    //create tiles with sockets
    tiles[0] = new Tile(new Image(), [0, 3], [0, 1, 2, 3, 4], [4], [2]);
    tiles[1] = new Tile(new Image(), [1, 2, 4], [-1], [1, 2, 3], [0, 2, 3, 4]);
    tiles[2] = new Tile(
      new Image(),
      [1, 2, 4],
      [0, 1, 2, 3, 4],
      [1, 2, 3],
      [0, 2]
    );
    tiles[3] = new Tile(new Image(), [1, 2, 4], [-1], [0], [1]);
    tiles[4] = new Tile(new Image(), [0, 3], [-1], [1, 2, 3], [0, 2]);
    //fill tiles with imgsrc
    for (let i = 0; i < urls.length; i++) {
      tiles[i].img.src = urls[i];
      tiles[i].img.onload = function () {
        if (loaded === urls.length) {
          console.dir('ALL IMAGES PRELOADED');
          _this.init();
        }
        loaded++;
      };
      console.dir(this.tiles[i]);
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
