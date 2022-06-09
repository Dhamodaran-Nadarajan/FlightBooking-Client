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
  message: string = '';
  showMessage: boolean = false;
  showAirlines: boolean = false;

  constructor(private airlineService: AirlineService) {}

  ngOnInit(): void {}

  getAirlines() {
    this.airlineService.getAllAirLines().subscribe(
      (response) => {
        console.log(response);
        this.allAirlines = response;
        this.showAirlines = true;
        this.showMessage = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  blockAirlineWithId(airlineId: any) {
    this.airlineService.blockAirline(airlineId).subscribe(
      (response) => {
        console.log(response);
        var airline = <IAirlines>response;
        this.message = `Airline '${airline.airlineName}' is successfully ${
          airline.isActive ? 'unblocked' : 'blocked'
        } !!`;
      },
      (error) => {
        console.log(error);
      }
    );
    this.showAirlines = false;
    this.showMessage = true;
  }

  deleteAirlineWithId(airlineId: any) {
    this.airlineService.deleteAirline(airlineId).subscribe(
      (response) => {
        console.log(response);
        var airline = <IAirlines>response;
        this.message = `Airline '${airline.airlineName}' is successfully deleted !!`;
      },
      (error) => {
        console.log(error);
      }
    );
    this.showAirlines = false;
    this.showMessage = true;
  }
}
