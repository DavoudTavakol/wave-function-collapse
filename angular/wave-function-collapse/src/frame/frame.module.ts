import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame/frame.component';
import { MatSliderModule } from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [FrameComponent],
  imports: [CommonModule, MatSliderModule, BrowserAnimationsModule],
  exports: [FrameComponent],
})
export class FrameModule {}
