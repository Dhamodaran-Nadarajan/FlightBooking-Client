import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AirlineService {
  baseUrl: string = 'http://localhost:7000/flightbooking/airlines';
  constructor(private http: HttpClient) {}

  getAllAirLines() {
    return this.http.get(this.baseUrl);
  }

  deleteAirline(airlineId: number) {
    return this.http.delete(this.baseUrl + `/${airlineId}`);
  }

  blockAirline(airlineId: number) {
    return this.http.put(this.baseUrl + `/${airlineId}`, '');
  }
}
