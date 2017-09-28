import { Component, OnInit, AfterViewInit, ViewChild,ElementRef } from '@angular/core';
import {WeatherService} from './services/weather.service';

declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // google api AIzaSyBg7zSkotlZ-lhSnDe8luGjkGuv5pzaUVQ
  // geocode - AIzaSyCl9G_I-n2OB6gmVui2MQ55PecegZji47g
  // private url = 'https://api.darksky.net/forecast/584af9729317fd49cf1621021267a76e/';

  public latitude;
  public longitude;
  public url = 'https://api.darksky.net/forecast/584af9729317fd49cf1621021267a76e/';
  public data;
  public loading: boolean = false;

  public geocoder;
  public map;
  public mapProp;

  constructor(private weatherServ: WeatherService) {

  }

  ngOnInit() {
    // google geocoder
    this.geocoder = new google.maps.Geocoder();

    //properties for map
    this.mapProp = {
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //create map
    this.map = new google.maps.Map(document.getElementById("map_canvas"), this.mapProp);

    let infoWindow = new google.maps.InfoWindow({map: this.map});

    //get my location at init and console url
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.url += this.latitude +',' + this.longitude;
      console.log(this.url);

      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //Center map on location and add location found
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      this.map.setCenter(pos);

      //call service to get weather data from darksky api
      //get data from longitude and latitude by geolocation
      this.weatherServ.requestDarkSky(this.latitude, this.longitude).subscribe(res => {
        this.loading = true;
        this.data = res;
        console.log(this.data);
      });
    });
  }
}

