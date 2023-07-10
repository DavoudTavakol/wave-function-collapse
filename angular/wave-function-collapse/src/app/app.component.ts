import { Component, ViewChild } from '@angular/core';
import { FrameComponent } from 'src/frame/frame/frame.component';
import { Tile } from '../frame/frame/tile';
import { landTiles } from '../frame/frame/data/land';
import { circuitTiles } from '../frame/frame/data/circuit';
import { mazeTiles } from 'src/frame/frame/data/maze';

export interface TileOption {
  name: String;
  tileData: Tile[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('frame') frame: FrameComponent;

  title = 'wave-function-collapse';

  dim: number = 9;
  sleep: number = 0;
  showOption: boolean = false;
  currentTiles: Tile[] = landTiles;
  tileOptions: TileOption[];

  constructor() {
    this.tileOptions = [
      {
        name: 'Land',
        tileData: landTiles,
      },
      {
        name: 'Circuit',
        tileData: circuitTiles,
      },
      {
        name: 'Maze',
        tileData: mazeTiles,
      },
    ];
  }

  updateDIM($event: any) {
    this.dim = $event.value;
    console.log(this.dim);
  }

  updateSLEEP($event: any) {
    this.sleep = $event.value;
    console.log(this.sleep);
  }

  updateCHECK($event: any) {
    this.showOption = $event.checked;
    console.log($event.checked);
  }

  updateCurrentTiles($event: any) {
    this.currentTiles = $event.value;
    console.log(this.currentTiles);
  }

  do() {
    console.log('CLICKED');
    this.frame.onClick();
  }
}
