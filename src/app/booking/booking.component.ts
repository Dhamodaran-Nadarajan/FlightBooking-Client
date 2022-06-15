import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../_services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  scheduleId: number;
  passengersCount = 0;
  message: string = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  public bookingForm: FormGroup;
  public passengersForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {
    this.createBookingForm();
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log('The id of this route is: ', params.id);
      if (params.id) this.scheduleId = params.id;
    });
  }

  createBookingForm() {
    this.bookingForm = this.fb.group({
      scheduleId: Number,
      name: <string>localStorage.getItem('user'),
      email: '',
      mealPreferrence: '',
      noOfPassengers: Number,
      passengers: this.fb.array([]),
    });
  }

  passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  newPassenger(): FormGroup {
    return this.fb.group({
      name: '',
      age: Number,
      gender: '',
    });
  }

  addPassenger() {
    this.passengersCount++;
    this.passengers().push(this.newPassenger());
  }

  removePassenger(i: number) {
    this.passengersCount--;
    this.passengers().removeAt(i);
  }

  bookFlight() {
    this.bookingForm.patchValue({
      noOfPassengers: this.passengersCount,
      scheduleId: this.scheduleId,
    });
    console.log(this.bookingForm.value);
    this.bookingService.bookFlight(this.bookingForm.value).subscribe(
      (response) => {
        const resp = <any>response;
        this.message = `Booking Successfull !!! Your PNR : ${resp.pnr}`;
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
      },
      (error: HttpErrorResponse) => {
        this.message = error.message;
        this.showSuccessMessage = false;
        this.showErrorMessage = true;
      }
    );
    this.bookingForm.reset();
  }
}
