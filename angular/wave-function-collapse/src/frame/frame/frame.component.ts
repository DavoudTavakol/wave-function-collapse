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

    const DIM: number = 4;
    const tileSize: number = 50;
    const canvasWidth: number = DIM * tileSize;
    const canvasHeight: number = DIM * tileSize;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const tiles: any = [];

    preload(whendone);

    function whendone(tiles: any) {

      ctx.drawImage(tiles[0], 0, 0);
      ctx.drawImage(tiles[1], 0+tileSize, 0);
      ctx.drawImage(tiles[2], 0+tileSize*2, 0);
      ctx.drawImage(tiles[2], 0+tileSize*3, 0);
/*
      for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
          ctx.drawImage(tiles[1], 0 + i * tileSize, 0 + j * tileSize);
        }
      }
*/
    }

    function preload(callback: any) {
      let total = 0;
      let loaded = 0;

      for (let i = 0; i < 4; i++) {
        tiles[i] = new Image();
        tiles[i].onload = function () {
          if (++loaded == total)
            callback (tiles);
        };
        tiles[i].src = 'assets/images/' + i + '.png';
        total++;
      }
    }
  }
}
