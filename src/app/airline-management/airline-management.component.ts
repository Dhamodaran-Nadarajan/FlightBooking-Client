import { Component, OnInit } from '@angular/core';
import { IAirlines } from '../_interfaces/airlines';
import { AirlineService } from '../_services/airline.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-airline-management',
  templateUrl: './airline-management.component.html',
  styleUrls: ['./airline-management.component.css'],
})
export class AirlineManagementComponent implements OnInit {
  allAirlines: any;

  constructor(private airlineService: AirlineService) {}

  ngOnInit(): void {}

  getAllAirlines() {
    console.log('Hey Man');
    this.airlineService.getAllAirLines().subscribe(
      (response) => {
        console.log(response);
        this.allAirlines = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
