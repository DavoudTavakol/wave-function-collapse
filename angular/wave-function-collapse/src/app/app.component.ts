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
  done: boolean = false;;

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

  updateStatus(newStatus: boolean) {
    this.done = newStatus;
    if(this.done){
      this.buttonName = "START";
    } else {
      this.buttonName = "START";
    }
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
    if (this.buttonName === 'START') {
      if(this.done) {
        this.frame.ngAfterViewInit();
      }
      this.frame.onClickStart();
      this.buttonName = 'STOP';
    } else {
      this.done = false;
      this.frame.onClickStop();
      this.buttonName = 'START';
    }
  }
}
