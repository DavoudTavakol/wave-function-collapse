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
    const ctx = canvas.getContext('2d');

    const tiles: any = [];

    function preload() {
      tiles[0] = new Image();
      tiles[0].src = 'assets/images/Sign_white.png';
    }

    if (ctx) {
      preload();

      tiles[0].onload = () => {
        ctx.drawImage(tiles[0], 0, 0);
      };
      
    }
  }
}
