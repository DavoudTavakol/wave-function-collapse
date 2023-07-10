import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { Tile } from './tile';
import { Cell } from './cell';
import { landTiles } from './data/land';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) myCanvas!: ElementRef;

  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  //tiles: Tile[] = [];

  @Input() DIM: number = 9;
  @Input() SLEEP: number = 0;
  @Input() showOption: boolean = false;
  @Input() tiles: Tile[] = landTiles;

  tileSize: number = 50;
  grid: Cell[] = [];
  ready: boolean = false;

  constructor() {}
  //YOU CANT DRAW IMAGES HERE SINCE NOT PRELOADED
  //BUT YOU CAN DO LOGIC
  ngAfterViewInit(): void {
    this.grid = [];
    this.ready = false;
    console.log('INITITAL DIM: ' + this.DIM);
    this.canvas = this.myCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = this.DIM * this.tileSize;
    this.canvas.height = this.DIM * this.tileSize;
    this.drawGrid(this.ctx);

    console.dir('STARTING..');

    //Filling Grid
    for (let i = 0; i < this.DIM * this.DIM; i++) {
      this.grid[i] = new Cell(this.tiles);
    }
  }

  ngOnChanges(): void {
    console.dir('ONCHANGE..');
    console.log('DIM: ' + this.DIM);
    this.ngAfterViewInit();
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
    this.ready = true;
    const sleep = (time: number) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    };
    const doSomething = async () => {
      for (let i = 0; i < this.DIM * this.DIM; i++) {
        await sleep(this.SLEEP);
        if(this.ready) {
        this.startwfc();
        }
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
          if (this.showOption) {
            this.drawOptions(tempCell, i, j);
          }
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
    this.ctx.font = '' + this.tileSize * 0.4 + 'px Arial';
    this.ctx.textAlign = 'center';
    let percent = tempCell.options.length / maxNum;
    this.ctx.fillStyle =
      'rgba(' + 255 * (1 - percent) + ',' + 200 * percent + ',0)';
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
