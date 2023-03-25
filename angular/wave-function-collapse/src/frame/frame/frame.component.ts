import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Tile } from './tile';
import { Cell } from './cell';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) myCanvas!: ElementRef;

  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  tiles: Tile[] = [];

  @Input() DIM: number = 2;
  tileSize: number = 50;
  grid: Cell[] = [];

  constructor() {
    
  }

  //YOU CANT DRAW IMAGES HERE SINCE NOT PRELOADED
  //BUT YOU CAN DO LOGIC
  ngAfterViewInit(): void {
    console.log("INITITAL DIM: "+this.DIM);
    this.canvas = this.myCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = this.DIM * this.tileSize;
    this.canvas.height = this.DIM * this.tileSize;
    this.drawGrid(this.ctx);

    console.dir('STARTING..');
    this.preload(this.tiles);

    //Filling Grid
    for (let i = 0; i < this.DIM * this.DIM; i++) {
      this.grid[i] = new Cell(this.tiles);
    }
  }

  ngOnChanges(): void {
    console.log("DIM: "+this.DIM);
    this.ngAfterViewInit();
  }

  preload(tiles: any) {
    //TODO: LOOP TO CREATE NEW TILES
    //create tiles with sockets
    tiles[0] = new Tile(
      0,
      'assets/images/circuit/0.png',
      'AAA',
      'AAA',
      'AAA',
      'AAA'
    );
    tiles[1] = new Tile(
      1,
      'assets/images/circuit/1.png',
      'BBB',
      'BBB',
      'BBB',
      'BBB'
    );
    tiles[2] = new Tile(
      2,
      'assets/images/circuit/2.png',
      'BBB',
      'BCB',
      'BBB',
      'BBB'
    );
    tiles[3] = new Tile(
      3,
      'assets/images/circuit/3.png',
      'BBB',
      'BDB',
      'BBB',
      'BDB'
    );
    tiles[4] = new Tile(
      4,
      'assets/images/circuit/4.png',
      'ABB',
      'BCB',
      'BBA',
      'AAA'
    );
    tiles[5] = new Tile(
      5,
      'assets/images/circuit/5.png',
      'ABB',
      'BBB',
      'BBB',
      'BBA'
    );
    tiles[6] = new Tile(
      6,
      'assets/images/circuit/6.png',
      'BBB',
      'BCB',
      'BBB',
      'BCB'
    );
    tiles[7] = new Tile(
      7,
      'assets/images/circuit/7.png',
      'BDB',
      'BCB',
      'BDB',
      'BCB'
    );
    tiles[8] = new Tile(
      8,
      'assets/images/circuit/8.png',
      'BDB',
      'BBB',
      'BCB',
      'BBB'
    );
    tiles[9] = new Tile(
      9,
      'assets/images/circuit/9.png',
      'BCB',
      'BCB',
      'BBB',
      'BCB'
    );
    tiles[10] = new Tile(
      10,
      'assets/images/circuit/10.png',
      'BCB',
      'BCB',
      'BCB',
      'BCB'
    );
    tiles[11] = new Tile(
      11,
      'assets/images/circuit/11.png',
      'BCB',
      'BCB',
      'BBB',
      'BBB'
    );
    tiles[12] = new Tile(
      12,
      'assets/images/circuit/12.png',
      'BBB',
      'BCB',
      'BBB',
      'BCB'
    );
    tiles[13] = tiles[2].rotateTile(13, 90);
    tiles[14] = tiles[2].rotateTile(14, 180);
    tiles[15] = tiles[2].rotateTile(15, 270);
    tiles[16] = tiles[3].rotateTile(16, 90);
    tiles[17] = tiles[4].rotateTile(17, 90);
    tiles[18] = tiles[4].rotateTile(18, 180);
    tiles[19] = tiles[4].rotateTile(19, 270);
    tiles[20] = tiles[5].rotateTile(20, 90);
    tiles[21] = tiles[5].rotateTile(21, 180);
    tiles[22] = tiles[5].rotateTile(22, 270);
    tiles[23] = tiles[6].rotateTile(23, 90);
    tiles[24] = tiles[7].rotateTile(24, 90);
    tiles[25] = tiles[8].rotateTile(25, 90);
    tiles[26] = tiles[8].rotateTile(26, 180);
    tiles[27] = tiles[8].rotateTile(27, 270);
    tiles[28] = tiles[9].rotateTile(28, 90);
    tiles[29] = tiles[9].rotateTile(29, 180);
    tiles[30] = tiles[9].rotateTile(30, 270);
    tiles[31] = tiles[10].rotateTile(31, 90);
    tiles[32] = tiles[11].rotateTile(32, 90);
    tiles[33] = tiles[11].rotateTile(33, 180);
    tiles[34] = tiles[11].rotateTile(34, 270);
    tiles[35] = tiles[12].rotateTile(35, 90);
  }

  /////
  /////YOU CAN DRAW IMAGES HERE NOW SINCE ALL PRELOADED
  /////
  startwfc() {
    ////Pick cell/cells with least entropy (sort all the cells then pick. if all same => pick random)
    //sort grid by # of options
    let gridCopy = [...this.grid];
    gridCopy = gridCopy.filter((a) => !a.collapsed);

    //all is collapsed
    if (gridCopy.length === 0) {
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
    const cell: Cell = gridCopy[this.getRandomInt(gridCopy.length)];
    //collapse cell
    cell.collapsed = true;
    //pick random option
    let pick = cell.options[this.getRandomInt(cell.options.length)];

    if (pick === undefined) {
      console.log('UNDEFINED PICK');
      this.ngAfterViewInit();
      return;
    }
    //replace option in cell
    cell.options = [pick];

    

    //update next gen tiles
    const nextGrid = [];
    for (let j = 0; j < this.DIM; j++) {
      for (let i = 0; i < this.DIM; i++) {
        let index = i + j * this.DIM;
        if (this.grid[index].collapsed) {
          nextGrid[index] = this.grid[index];
        } else {
          let validTiles: Tile[] = [];
          let allOptions: number[] = [];
          this.tiles.forEach((element) => {
            allOptions.push(element.id);
          });
          //checktop
          if (j > 0) {
            let upCell: Cell = this.grid[i + (j - 1) * this.DIM];
            let validOptions: number[] = [];
            //get valid sockets from cell ontop
            for (let options of upCell.options) {
              let valid = options.down;
              //get tiles with valid socket
              for (let i = 0; i < this.tiles.length; i++) {
                if (this.tiles[i].up === this.reverseString(valid)) {
                  validOptions = validOptions.concat(this.tiles[i].id);
                }
              }
            }
            checkValid(allOptions, validOptions);
          }
          //checkright
          if (i < this.DIM - 1) {
            let rightCell: Cell = this.grid[i + 1 + j * this.DIM];
            let validOptions: number[] = [];
            for (let options of rightCell.options) {
              let valid = options.left;
              for (let i = 0; i < this.tiles.length; i++) {
                if (this.tiles[i].right === this.reverseString(valid)) {
                  validOptions = validOptions.concat(this.tiles[i].id);
                }
              }
            }
            checkValid(allOptions, validOptions);
          }
          //checkdown
          if (j < this.DIM - 1) {
            let downCell: Cell = this.grid[i + (j + 1) * this.DIM];
            let validOptions: number[] = [];
            for (let options of downCell.options) {
              let valid = options.up;
              for (let i = 0; i < this.tiles.length; i++) {
                if (this.tiles[i].down === this.reverseString(valid)) {
                  validOptions = validOptions.concat(this.tiles[i].id);
                }
              }
            }
            checkValid(allOptions, validOptions);
          }
          //checkleft
          if (i > 0) {
            let leftCell: Cell = this.grid[i - 1 + j * this.DIM];
            let validOptions: number[] = [];
            for (let options of leftCell.options) {
              let valid = options.right;
              for (let i = 0; i < this.tiles.length; i++) {
                if (this.tiles[i].left === this.reverseString(valid)) {
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
          nextGrid[index] = new Cell(validTiles);
          nextGrid[index].collapsed = false;
        }
      }
    }
    this.grid = nextGrid;

    //go through all of the grid and draw cell IF its collapsed!
   this.draw();

    function checkValid(allOpt: number[], validOptions: number[]) {
      for (let i = allOpt.length - 1; i >= 0; i--) {
        if (!validOptions.includes(allOpt[i])) {
          allOpt.splice(i, 1);
        }
      }
    }
  }

  onClick() {
    /*
    while (this.done === false) {
      this.startwfc();
    }
    */

    const sleep = (time: number) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    };
    const doSomething = async () => {
      for (let i = 0; i < this.DIM * this.DIM; i++) {
        await sleep(0);
        this.startwfc();
      }
    };
    doSomething();
  }

  draw() {
    for (let j = 0; j < this.DIM; j++) {
      for (let i = 0; i < this.DIM; i++) {
        let tempCell: Cell = this.grid[i + j * this.DIM];
        if (tempCell.collapsed) {
          this.imageDraw(
            tempCell.options[0],
            i * this.tileSize,
            j * this.tileSize
          );
        } else {
          this.drawOptions(tempCell, i, j);
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
    this.ctx.drawImage(tile.img, x, y, this.tileSize, this.tileSize);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
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


  drawOptions(tempCell: Cell, x: number, y: number) {
    //calcualte color code and style
    const maxNum = this.tiles.length;
    this.ctx.font = ''+this.tileSize*0.4+'px Arial';
    this.ctx.textAlign = 'center';
    let percent =  tempCell.options.length / maxNum;
    this.ctx.fillStyle = 'rgba('+255*(1-percent)+','+200*percent+',0)';
    //clear previous text
    this.ctx.clearRect(
      x * this.tileSize + this.tileSize / 4,
      y * this.tileSize + this.tileSize / 4,
      this.tileSize / 2,
      this.tileSize / 2
    );

    //draw new text
    this.ctx.fillText(
      tempCell.options.length.toString(),
      x * this.tileSize + this.tileSize / 2,
      y * this.tileSize + this.tileSize / 2 + 5
    );
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  reverseString(str: string) {
    return str.split('').reverse().join('');
  }
}
