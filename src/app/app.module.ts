import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//module - http request
import { HttpModule,JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
