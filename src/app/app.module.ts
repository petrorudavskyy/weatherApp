import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//module - http request
import { HttpModule,JsonpModule } from '@angular/http';

//inport service
import {WeatherService} from './services/weather.service';

import { AppComponent } from './app.component';
//temperature pipe
import {TemperaturePipe} from './pipes/temperature.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TemperaturePipe
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
