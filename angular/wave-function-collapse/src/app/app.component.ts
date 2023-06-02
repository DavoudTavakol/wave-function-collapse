import { Component, ViewChild } from '@angular/core';
import { FrameComponent } from 'src/frame/frame/frame.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('frame') frame:FrameComponent;


  title = 'wave-function-collapse';

  value: number = 9;
  sleep: number = 0;
  showOption: boolean = false;

  updateDIM($event: any) {
    this.value = $event.value;
    console.log(this.value);
  }

  updateSLEEP($event: any) {
    this.sleep = $event.value;
    console.log(this.sleep);
  }

  
  updateCHECK($event: any) {
    this.showOption = $event.checked;
    console.log($event.checked);
  }

  do() {
    console.log("CLICKED");
    this.frame.onClick();
  }
  
}

