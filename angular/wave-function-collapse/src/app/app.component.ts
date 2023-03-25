import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wave-function-collapse';

  value: number = 2;

  updateSetting($event: any) {
    this.value = $event.value;
    console.log(this.value);
  }
  
}

