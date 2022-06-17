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
  admin_view: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  showBookingDetails: boolean = false;
  showPassengersDetails: boolean = false;
  showAllBookingData: boolean = false;

  allbookingDetails: any;
  bookingdata: bookingDetails;
  airlineData: scheduleDetails;
  passengerData: any;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.admin_view = <string>localStorage.getItem('user') === 'Admin_User';
  }
  cancel(pnr: any) {
    this.bookingService.cancelTicket(pnr).subscribe(
      (response) => {
        this.message = 'Ticket cancelled successfully..';
        this.resetStatus();
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
                this.showAllBookingData = false;
                this.showBookingDetails = true;
                this.getPassengersDetails(this.bookingdata.bookingId);
              },
              (err: HttpErrorResponse) => {
                this.message = err.error.message;
                this.showAllBookingData = false;
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

  getAllBookings() {
    if (this.admin_view) {
      this.bookingService.getAllBookings().subscribe(
        (response) => {
          this.allbookingDetails = <bookingDetails>response;
          this.showBookingDetails = false;
          this.showPassengersDetails = false;
          this.showAllBookingData = true;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          this.message = err.error;

          this.showErrorMessage = true;
        }
      );
    } else {
      this.message = 'Only admin can do this action !!';
      this.showErrorMessage = true;
    }
  }

  resetStatus() {
    this.message = '';
    this.admin_view = false;
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.showBookingDetails = false;
    this.showPassengersDetails = false;
    this.showAllBookingData = false;
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
