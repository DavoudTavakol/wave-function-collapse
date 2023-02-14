import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements OnInit {
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef;

  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const DIM: number = 15;
    const tileSize: number = 50;
    const canvasWidth: number = DIM * tileSize;
    const canvasHeight: number = DIM * tileSize;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const tiles: any = [];

    const srcUrl: string[] = [
      'assets/images/0.png',
      'assets/images/1.png',
      'assets/images/2.png',
      'assets/images/3.png',
    ];

    drawGrid();
    preload(srcUrl, whendone);

    function whendone(tiles: any) {
      //test
      ctx.drawImage(tiles[0], 0, 0);
      ctx.drawImage(tiles[1], 0 + tileSize, 0);
      ctx.drawImage(tiles[2], 0, 0 + tileSize);
      ctx.drawImage(tiles[3], tileSize, tileSize);

      for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
          //test with random tile
          //ctx.drawImage(tiles[Math.floor(Math.random() * 4)],i * tileSize,j * tileSize);
        }
      }
    }

    function preload(urls: string[], callback: any) {
      let loaded = 0;
      for (let i = 0; i < srcUrl.length; i++) {
        tiles[i] = new Image();
        tiles[i].src = srcUrl[i];
        tiles[i].onload = function () {
          if (loaded === srcUrl.length) {
            callback(tiles);
            console.dir('ALL IMAGES PRELOADED');
          }
        };
        loaded++;
      }
    }

    function drawGrid() {
      for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(255,255,255,0.1)';
          ctx.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }
  }
}
