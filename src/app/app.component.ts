import { Component, OnInit, AfterViewInit, ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public latitude;
  public longitude;
  public url = 'https://api.darksky.net/forecast/584af9729317fd49cf1621021267a76e/';
  // private url = 'https://api.darksky.net/forecast/584af9729317fd49cf1621021267a76e/';
  constructor() {

  }

  ngOnInit() {
    //get my location at init and console url
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.url += this.latitude +',' + this.longitude;
      console.log(this.url);
    });
  }
}
