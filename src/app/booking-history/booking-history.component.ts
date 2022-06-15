import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AirlineService } from '../_services/airline.service';
import { BookingService } from '../_services/booking.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
})
export class BookingHistoryComponent implements OnInit {
  pnr: number;
  message: string = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  showBookingDetails: boolean = false;
  showPassengersDetails: boolean = false;

  bookingdata: bookingDetails;
  airlineData: scheduleDetails;
  passengerData: any;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {}
  cancel(pnr: any) {
    this.bookingService.cancelTicket(pnr).subscribe(
      (response) => {
        this.message = 'Ticket cancelled successfully..';
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.message = error.error;
        this.showErrorMessage = true;
        this.showSuccessMessage = false;
      }
    );
  }
  findBooking(pnr: any) {
    if (pnr) this.getBookingDetails(pnr);
  }

  getBookingDetails(pnr: any) {
    this.bookingService.getBookingByPnr(pnr).subscribe(
      (response) => {
        this.showErrorMessage = false;
        this.bookingdata = <bookingDetails>response;
        if (this.bookingdata.scheduleId) {
          this.bookingService
            .getAirlineSchedule(this.bookingdata.scheduleId)
            .subscribe(
              (resp) => {
                this.airlineData = <scheduleDetails>resp;
                this.showBookingDetails = true;
                this.getPassengersDetails(this.bookingdata.bookingId);
              },
              (err: HttpErrorResponse) => {
                this.message = err.error.message;
                this.showErrorMessage = true;
                this.showSuccessMessage = false;
                this.showBookingDetails = false;
              }
            );
        }
      },
      (error: HttpErrorResponse) => {
        this.message = error.error.message;
        this.showErrorMessage = true;
        this.showBookingDetails = false;
      }
    );
  }

  getPassengersDetails(bookingId: number) {
    this.bookingService.getPassengers(bookingId).subscribe(
      (response) => {
        this.passengerData = response;
        this.showPassengersDetails = true;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}

interface bookingDetails {
  bookingId: number;
  email: string;
  mealPreferrence: string;
  name: string;
  noOfPassengers: number;
  passengers: {};
  pnr: number;
  scheduleId: number;
  seatNumbers: string;
}

interface scheduleDetails {
  airlineId: number;
  from: string;
  to: string;
  departure: Date;
  arrival: Date;
  businessSeats: number;
  nonBusinessSeats: number;
  ticketPrice: number;
  scheduledDays: string;
  meal: string;
}

interface passengerDetails {
  age: number;
  bookingId: number;
  gender: string;
  name: string;
}
