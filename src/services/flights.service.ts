import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Environment } from "../environments/environments";
import {BehaviorSubject} from "rxjs";
import {Flight} from "../entities/flight";

@Injectable()
export class FlightsService {
  public flightsBehaviorSubject: BehaviorSubject<Flight[]>;

  constructor(private customHttpService: CustomHttpService) {
    this.flightsBehaviorSubject = new BehaviorSubject(undefined);
  }

  getFlightsBehaviorSubject(): BehaviorSubject<Flight[]> {
    return this.flightsBehaviorSubject;
  }

  getFlights(): Promise<any> {
          let url = Environment.mainServerURL + Environment.get_flights;
          return this.customHttpService.get(url)
            .then(res => {
              return res.json();
            })
            .catch(err => {
              console.log(err);

            });

  }

  searchFlights(startPoint, endPoint, startDate, endDate): Promise<any> {
    let url = Environment.mainServerURL + Environment.search_flights;
    let params = {
      sp: startPoint,
      ep: endPoint,
      sd: startDate,
      ed: endDate
    };
    return this.customHttpService.get(url, params)
      .then(res => {

        this.flightsBehaviorSubject.next(res.json().result);
        return res.json();
      })
      .catch(err => {
        console.log(err);

      });

  }


}



