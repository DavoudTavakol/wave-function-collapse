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
    if(gridCopy.length === 0) {
      this.done = true;
      console.log("ALL COLAB");
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

    if(pick === undefined) {
      console.log("UNDEFINED PICK");
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
          this.ctx.drawImage(
            tempCell.options[0].img,
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
          let allOptions: number[] = [0, 1, 2, 3, 4];
          //checktop
          if (j > 0) {
            let upCell = this.grid[i + (j - 1) * this.DIM];
            let validOptions: number[] = [];
            for (let options of upCell.options) {
              let valid = options.down;
              validOptions = validOptions.concat(valid);
            }
            checkValid(allOptions, validOptions);
          }
          //checkright
          if (i < this.DIM - 1) {
            let rightCell = this.grid[i + 1 + j * this.DIM];
            let validOptions: number[] = [];
            for (let options of rightCell.options) {
              let valid = options.left;
              validOptions = validOptions.concat(valid);
            }
            checkValid(allOptions, validOptions);
          }
          //checkdown
          if (j < this.DIM - 1) {
            let downCell = this.grid[i + (j + 1) * this.DIM];
            let validOptions: number[] = [];
            for (let options of downCell.options) {
              let valid = options.up;
              validOptions = validOptions.concat(valid);
            }
            checkValid(allOptions, validOptions);
          }
          //checkleft
          if (i > 0) {
            let leftCell = this.grid[i - 1 + j * this.DIM];
            let validOptions: number[] = [];
            for (let options of leftCell.options) {
              let valid = options.right;
              validOptions = validOptions.concat(valid);
            }
            checkValid(allOptions, validOptions);
          }

          for (let i = 0; i < allOptions.length; i++) {
            validTiles.push(this.tiles[allOptions[i]]);
          }

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

    function checkValid(allOpt: number[], valid: number[]) {
      for (let i = allOpt.length - 1; i >= 0; i--) {
        if (!valid.includes(allOpt[i])) {
          allOpt.splice(i, 1);
        }
      }
    }
  }

  onClick() {
    while(this.done === false) {
      this.init();
    }
  }

  preload(urls: string[], tiles: any) {
    let loaded = 1;
    let _this = this;
    //create tiles with sockets
    tiles[0] = new Tile(
      0,
      new Image(),
      [0, 1, 4],
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4]
    );
    tiles[1] = new Tile(1, new Image(), [2, 3], [3, 4], [0, 2, 3], [0, 3, 4]);
    tiles[2] = new Tile(2, new Image(), [0, 1, 4], [3, 4], [1, 4], [0, 3, 4]);
    tiles[3] = new Tile(3, new Image(), [0, 1, 4], [0, 1, 2], [1, 4], [1, 2]);
    tiles[4] = new Tile(4, new Image(), [2, 3], [0, 1, 2], [0, 2, 3], [1, 2]);
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
