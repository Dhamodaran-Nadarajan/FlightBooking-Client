import { Component, OnInit } from '@angular/core';
import { IAirlines } from '../_interfaces/airlines';
import { AirlineService } from '../_services/airline.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-airline-management',
  templateUrl: './airline-management.component.html',
  styleUrls: ['./airline-management.component.css'],
})

//

//
export class AirlineManagementComponent implements OnInit {
  allAirlines: any;
  message: string = '';
  showMessage: boolean = false;
  showErrorMessage: boolean = false;
  showAirlines: boolean = false;
  showAddAirline: boolean = false;
  airlineRegForm: FormGroup;

  constructor(
    private airlineService: AirlineService,
    private formBuild: FormBuilder
  ) {
    this.airlineRegForm = this.buildAirlineData(this.formBuild);
  }

  ngOnInit(): void {}

  getAirlines() {
    this.airlineService.getAllAirLines().subscribe(
      (response) => {
        this.allAirlines = response;
        this.showAirlines = true;
        this.showMessage = false;
        this.showAddAirline = false;
        this.showErrorMessage = false;
      },
      (error: HttpErrorResponse) => {
        this.message = error.message;
        this.showAirlines = false;
        this.showMessage = false;
        this.showAddAirline = false;
        this.showErrorMessage = true;
      }
    );
  }

  blockAirlineWithId(airlineId: any) {
    this.airlineService.blockAirline(airlineId).subscribe(
      (response) => {
        var airline = <IAirlines>response;
        this.message = `Airline '${airline.airlineName}' is successfully ${
          airline.isActive ? 'unblocked' : 'blocked'
        } !!`;
        this.showMessage = true;
        this.showErrorMessage = false;
      },
      (error: HttpErrorResponse) => {
        this.message = error.message;
        this.showMessage = false;
        this.showErrorMessage = true;
      }
    );
    this.showAirlines = false;
    this.showAddAirline = false;
  }

  deleteAirlineWithId(airlineId: any) {
    this.airlineService.deleteAirline(airlineId).subscribe(
      (response) => {
        console.log(response);
        var airline = <IAirlines>response;
        this.message = `Airline '${airline.airlineName}' is successfully deleted !!`;
        this.showMessage = true;
        this.showErrorMessage = false;
      },
      (error: HttpErrorResponse) => {
        this.message = error.message;
        this.showMessage = false;
        this.showErrorMessage = true;
      }
    );
    this.showAddAirline = false;
    this.showAirlines = false;
  }

  addAirline() {
    this.showAirlines = false;
    this.showMessage = false;
    this.showErrorMessage = false;
    this.showAddAirline = true;
  }

  onAddAirlineSubmit() {
    if (this.airlineRegForm.valid)
      this.airlineService
        .addAirline(<IAirlines>this.airlineRegForm.value)
        .subscribe(
          (response) => {
            console.log(response);
            var airline = <IAirlines>response;
            this.message = `Airline '${airline.airlineName}' is successfully added !!. Airline ID : ${airline.airlineId}`;
            this.showMessage = true;
            this.showErrorMessage = false;
            this.showAddAirline = false;
          },
          (error: HttpErrorResponse) => {
            this.message = error.message;
            this.showMessage = false;
            this.showErrorMessage = true;
            this.showAddAirline = false;
          }
        );
    else this.airlineRegForm.reset();
  }

  private buildAirlineData(formBuild: FormBuilder): FormGroup {
    return formBuild.group({
      airlineName: ['', Validators.required],
      contactAddress: ['', Validators.required],
      contactNumber: ['', Validators.required],
      contactLogo: ['', Validators.required],
      isActive: [true],
    });
  }
}
