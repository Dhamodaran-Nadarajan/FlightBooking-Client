import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAirlines } from '../_interfaces/airlines';
import { IScheduleAirlineData } from '../_interfaces/scheduleAirlineData';
import { AirlineService } from '../_services/airline.service';
import { InventoryService } from '../_services/inventory.service';

@Component({
  selector: 'app-schedule-airline',
  templateUrl: './schedule-airline.component.html',
  styleUrls: ['./schedule-airline.component.css'],
})
export class ScheduleAirlineComponent implements OnInit {
  //
  loadAirlineData: boolean;
  airlinesData: any = null;
  message: string = '';
  scheduleAirlineForm: FormGroup;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  //
  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private airliineService: AirlineService
  ) {
    this.scheduleAirlineForm = this.buildScheduleForm(this.formBuilder);
  }

  ngOnInit(): void {
    this.airliineService.getAllAirLines().subscribe((response) => {
      this.airlinesData = <IAirlines>response;
      this.loadAirlineData = true;
      console.log(this.airlinesData);
    });
  }

  scheduleAirline() {
    if (this.scheduleAirlineForm.valid) {
      this.inventoryService
        .scheduleAirline(this.scheduleAirlineForm.value)
        .subscribe(
          (response) => {
            this.message = 'Scheduled successfully..';
            this.showSuccessMessage = true;
            this.showErrorMessage = false;
          },
          (error: HttpErrorResponse) => {
            this.message =
              error.status === 403
                ? 'Only administrator can do this action !!!'
                : error.message;
            this.showSuccessMessage = false;
            this.showErrorMessage = true;
          }
        );
    } else {
      alert('Invalid Form..');
    }
    this.scheduleAirlineForm.reset();
  }

  private buildScheduleForm(formBuild: FormBuilder): FormGroup {
    return formBuild.group({
      airlineId: [Number, Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      departure: [Date, Validators.required],
      arrival: [Date, Validators.required],
      businessSeats: ['', Validators.required],
      nonBusinessSeats: ['', Validators.required],
      ticketPrice: [Number, Validators.required],
      scheduledDays: ['', Validators.required],
      meal: ['', Validators.required],
    });
  }
}
