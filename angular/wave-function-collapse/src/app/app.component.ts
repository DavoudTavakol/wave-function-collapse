import { Component, ViewChild } from '@angular/core';
import { FrameComponent } from 'src/frame/frame/frame.component';
import { Tile } from '../frame/frame/tile';
import { landTiles } from '../frame/frame/data/land';
import { circuitTiles } from '../frame/frame/data/circuit';
import { mazeTiles } from 'src/frame/frame/data/maze';
import { circleTiles } from 'src/frame/frame/data/circles';

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
  buttonName: String = 'START';

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
      {
        name: 'Circles',
        tileData: circleTiles,
      },
    ];
  }

  updateDIM($event: any) {
    this.buttonName = 'START'
    this.dim = $event.value;
    console.log(this.dim);
  }

  updateSLEEP($event: any) {
    this.buttonName = 'START'
    this.sleep = $event.value;
    console.log(this.sleep);
  }

  updateCHECK($event: any) {
    this.buttonName = 'START'
    this.showOption = $event.checked;
    console.log($event.checked);
  }

  updateCurrentTiles($event: any) {
    this.buttonName = 'START'
    this.currentTiles = $event.value;
    console.log(this.currentTiles);
  }

  do() {
    if (this.buttonName === 'START') {
      this.frame.onClickStart();
      this.buttonName = 'STOP';
    } else {
      this.frame.onClickStop();
      this.buttonName = 'START';
    }
  }
}
