import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IScheduleAirlineData } from '../_interfaces/scheduleAirlineData';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  baseUrl: string = 'http://localhost:7000/flightbooking/search/';
  constructor(private http: HttpClient) {}

  scheduleAirline(airlineData: IScheduleAirlineData) {
    return this.http.post(this.baseUrl, airlineData);
  }
}
