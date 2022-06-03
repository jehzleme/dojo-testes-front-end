import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecastComponent } from './weather-forecast.component';
import { WeatherForecastRoutingModule } from './weather-forecast.routing';
import { NgZorroAntDModule } from '../ngzorro-antd.module';
import { DegreeEmojiPipe } from './degree-emoji.pipe';

@NgModule({
  declarations: [
    WeatherForecastComponent,
    DegreeEmojiPipe
  ],
  imports: [
    CommonModule,
    WeatherForecastRoutingModule,
    NgZorroAntDModule
  ]
})
export class WeatherForecastModule { }
