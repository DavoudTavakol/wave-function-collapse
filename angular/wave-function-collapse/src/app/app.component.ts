import { Component, ViewChild } from '@angular/core';
import { FrameComponent } from 'src/frame/frame/frame.component';
import { Tile } from '../frame/frame/tile';
import { landTiles } from '../frame/frame/data/land';
import { circuitTiles } from '../frame/frame/data/circuit';
import { mazeTiles } from 'src/frame/frame/data/maze';
import { circleTiles } from 'src/frame/frame/data/circles';
import { roomTiles } from 'src/frame/frame/data/rooms';
import { purpleMazeTiles } from 'src/frame/frame/data/purpleMaze';

export interface TileOption {
  name: String;
  tileData: Tile[];
}

enum Mode {
  SCANLINE = "SCANLINE",
  LOW = "LOWESTENTROPY"
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
  size: number = 50;
  sleep: number = 0;
  showOption: boolean = false;
  currentTiles: Tile[] = landTiles;
  tileOptions: TileOption[];
  buttonName: String = 'START';
  done: boolean = false;
  mode: string[] = [];
  currentMode: string = Mode.LOW;
  result: string = 'Hello world!'

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
      {
        name: 'Rooms',
        tileData: roomTiles,
      },
      {
        name: 'Purple-Maze',
        tileData: purpleMazeTiles,
      },
    ];

    this.mode = [Mode.SCANLINE, Mode.LOW]
  }

  getMultipleChoiceAnswer($event: any) {
    this.currentMode = $event.value;
    console.log($event.value);
  }

  updateStatus(newStatus: boolean) {
    this.done = newStatus;
    if(this.done){
      this.buttonName = "START";
    } else {
      this.buttonName = "START";
    }
  }

  updateResultStatus(newResult: boolean) {
    if(newResult) {
      this.result = 'FINISHED'
    } else {
      this.result = 'FAILURE'
    }
  }

  updateDIM($event: any) {
    this.dim = $event.value;
    console.log(this.dim);
  }

  updateSIZE($event: any) {
    this.size = $event.value;
    console.log(this.size);
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
  }

  do() {
    if (this.buttonName === 'START') {
      if(this.done) {
        this.frame.ngAfterViewInit();
      }
      this.frame.onClickStart();
      this.result = 'processing...'
      this.buttonName = 'STOP';
    } else {
      this.done = false;
      this.frame.onClickStop();
      this.result = 'stopped...'
      this.buttonName = 'START';
    }
  }
}
