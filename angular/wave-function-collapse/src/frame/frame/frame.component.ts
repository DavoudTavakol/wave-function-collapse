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
  
  DIM: number = 15;
  tileSize: number = 50;
  canvasWidth: number = this.DIM * this.tileSize;
  canvasHeight: number = this.DIM * this.tileSize;

  constructor() {}

  ngOnInit(): void {
    //const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    //const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    this.canvas = this.myCanvas.nativeElement;
    this.ctx = this.canvas.getContext("2d")!;

    console.log(this.canvas);
    console.log(this.ctx);
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.drawGrid(this.ctx);
  }

  doSmth() {   

    preload(this.srcUrl, this.tiles , () => {
      this.ctx.drawImage(this.tiles[0], 0, 0);
      this.ctx.drawImage(this.tiles[1], 0 + this.tileSize, 0);
      this.ctx.drawImage(this.tiles[2], 0, 0 + this.tileSize);
      this.ctx.drawImage(this.tiles[3], this.tileSize, this.tileSize);

      for (let i = 0; i < this.DIM; i++) {
        for (let j = 0; j < this.DIM; j++) {
          //test with random tile
          //ctx.drawImage(tiles[Math.floor(Math.random() * 4)],i * tileSize,j * tileSize);
        }
      }
    });

    function preload(urls: string[], tiles: any, callback: any) {
      let loaded = 0;
      for (let i = 0; i < urls.length; i++) {
        tiles[i] = new Image();
        tiles[i].src = urls[i];
        tiles[i].onload = function () {
          if (loaded === urls.length) {
            callback(tiles);
            console.dir('ALL IMAGES PRELOADED');
          }
        };
        loaded++;
      }
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
}
