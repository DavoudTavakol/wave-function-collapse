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

    const DIM: number = 2;
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

    preload(srcUrl, whendone);

    function whendone(tiles: any) {
      ctx.drawImage(tiles[0], 0, 0);
      ctx.drawImage(tiles[1], 0 + tileSize, 0);
      ctx.drawImage(tiles[2], 0, 0 + tileSize);
      ctx.drawImage(tiles[3], tileSize, tileSize);
      /*
      for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
          ctx.drawImage(tiles[1], 0 + i * tileSize, 0 + j * tileSize);
        }
      }
*/
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
  }
}
