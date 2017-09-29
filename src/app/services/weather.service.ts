import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions,Jsonp } from '@angular/http';

import { Observable,Subject} from 'rxjs/Rx';

import 'rxjs/Rx';

@Injectable()

//Request service
export class WeatherService {
  constructor(private http: Http,private jsonp:Jsonp) {

  }

  //darksky url
  private url = 'https://api.darksky.net/forecast/584af9729317fd49cf1621021267a76e/';
  public loading = new Subject<boolean>();
  //service for get data with weather

  requestDarkSky(latitude: string, longitude: string)  {
    this.loading.next(true);
    return this.jsonp.get(this.url+latitude+','+longitude+'/?callback=JSONP_CALLBACK')
      .map((res: Response) => {
        return res.json() || {};
      }).catch((error: any) => {
        return Observable.throw(error);
      }).finally(() => {
        this.loading.next(false)
      });
  }

  private extractData(res: Response) {
    let body;
    if (res.text()) {
      body = res.json();
    }
    return body || {};
  }
}
