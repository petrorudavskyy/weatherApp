import { Component, OnInit, AfterViewInit, ViewChild,ElementRef } from '@angular/core';
import {WeatherService} from './services/weather.service';


declare var google: any;
declare var Skycons: any;
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
  public loading: boolean;

  public geocoder;
  public map;
  public mapProp;
  public location;
  public value = '';


  constructor(private weatherServ: WeatherService) {

  }

  ngOnInit() {
    this.weatherServ.loading.subscribe((value: boolean) => this.loading = value);

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

      //geocode for current position for whole location
      this.geocoder.geocode({'location': pos}, (results, status) =>{

        if (status === 'OK') {
          this.location = results[1];
          // this.model.location = results[1];
        }
      });



      //Center map on location and add location found
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      this.map.setCenter(pos);

      //call service to get weather data from darksky api
      //get data from longitude and latitude by geolocation
      this.weatherServ.requestDarkSky(this.latitude, this.longitude).subscribe(res => {
        this.data = res;
        this.setSkycons(this.data.currently.icon);
      });


    });
  }

  setSkycons(type) {
    var skycons = new Skycons({"monochrome": false,
      "colors": {
        "main": "#333333",
        "moon": "#78586F",
        "fog": "#78586F",
        "fogbank": "#B4ADA3",
        "cloud": "#B4ADA3",
        "snow": "#7B9EA8",
        "leaf":"#7B9EA8",
        "rain": "#7B9EA8",
        "sun": "#FF8C42"
      }
    });
    //add animation
    skycons.add('icon1', type);
    skycons.play();
  }

  onKey(value) {

    let inputMap = this.map;

    this.geocoder.geocode({'address': value}, (results, status) => {
      if (status === 'OK') {
        //get lat and long from input
        let inputLatitude = results[0].geometry.bounds.f.b;
        let inputLongitude = results[0].geometry.bounds.b.b;

        //request darksky from input
        this.weatherServ.requestDarkSky(inputLatitude,inputLongitude).subscribe(res => {
          this.data = res;
          console.log(res);
          this.setSkycons(this.data.currently.icon);
        });

        //center map on location
        inputMap.setCenter(results[0].geometry.location);

        var marker = new google.maps.Marker({
          map: inputMap,
          position: results[0].geometry.location
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}

