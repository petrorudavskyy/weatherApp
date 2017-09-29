import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//module - http request
import { HttpModule,JsonpModule } from '@angular/http';

//inport service
import {WeatherService} from './services/weather.service';

import { AppComponent } from './app.component';
//temperature pipe
import {TemperaturePipe} from './pipes/temperature.pipe';

import {WeatherComponent} from './weather/weather.component';

@NgModule({
  declarations: [
    AppComponent,
    TemperaturePipe,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,

  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
