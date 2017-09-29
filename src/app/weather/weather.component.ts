import { Component, OnInit, AfterViewInit, ViewChild,ElementRef ,Input} from '@angular/core';
import {WeatherService} from '../services/weather.service';

declare var google: any;
declare var Skycons: any

@Component({
  selector: 'weather-component',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent {
  @Input('model') model: any;

  constructor(private weatherServ: WeatherService) {

  }
}
