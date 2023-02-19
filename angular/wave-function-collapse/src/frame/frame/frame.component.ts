import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements OnInit {
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;

  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  tiles: any = [];

  srcUrl: string[] = [
    'assets/images/0.png',
    'assets/images/1.png',
    'assets/images/2.png',
    'assets/images/3.png',
  ];

  DIM: number = 2;
  tileSize: number = 50;
  canvasWidth: number = this.DIM * this.tileSize;
  canvasHeight: number = this.DIM * this.tileSize;

  grid: any = [];
  readonly BLANK: number = 0;
  readonly UP: number = 0;
  readonly RIGHT: number = 0;
  readonly DOWN: number = 0;
  readonly LEFT: number = 4;

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

  preload(urls: string[], tiles: any) {
    let loaded = 1;
    let _this = this;
    for (let i = 0; i < urls.length; i++) {
      tiles[i] = new Image();
      tiles[i].src = urls[i];
      tiles[i].onload = function () {
        if (loaded === urls.length) {
          console.dir('ALL IMAGES PRELOADED');
          _this.init();
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




  //YOU CAN DRAW IMAGES HERE NOW SINCE ALL PRELOADED
  init() {
    console.dir("STARTING..");

    //Filling Grid
    for (let i = 0; i < this.DIM * this.DIM; i++) {
      this.grid[i] = {
        collapsed: false,
        options: [this.BLANK, this.UP, this.RIGHT, this.DOWN, this.LEFT],
      };
    }

    this.grid[2].options = [this.BLANK, this.UP];


    //Pick cell with least entropy (sort all the cells then pick. if all same => pick random)
    const gridCopy = this.grid.slice();
    gridCopy.sort((a: any, b: any) => {
      return a.options.length - b.options.length;
    });
    console.log(this.grid);
    console.log(gridCopy);


    for (let i = 0; i < this.DIM; i++) {
      for (let j = 0; j < this.DIM; j++) {
        let cell = this.grid[i + j * this.DIM];
        cell.collapsed = true;
        if (cell.collapsed) {
          let index = cell.options[0];
          this.ctx.drawImage(
            this.tiles[index],
            i * this.tileSize,
            j * this.tileSize
          );
        }
      }
    }
  }

  

  x: number = 0;
  y: number = 0;
  onClick() {
    this.ctx.drawImage(
      this.tiles[Math.floor(Math.random() * 4)],
      this.x,
      this.y
    );
    this.x = this.x + this.tileSize;
    if (this.x >= this.tileSize * this.DIM) {
      this.y = this.y + this.tileSize;
      this.x = 0;
    }
  }
}
