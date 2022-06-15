import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../_services/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message: string = '';
  availableAirlines: any;
  searchAirlineForm: FormGroup;
  showAirlines: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private boodkingService: BookingService,
    private router: Router
  ) {
    this.searchAirlineForm = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  searchAirlines() {
    if (this.searchAirlineForm.valid) {
      const data = <search>this.searchAirlineForm.value;
      this.boodkingService.searchAirlines(data.from, data.to).subscribe(
        (response) => {
          this.availableAirlines = <AirlineDetails>response;
          this.showAirlines = true;
          this.message = '';
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
          this.message = error.error;
        }
      );
      this.searchAirlineForm.reset();
    }
  }

  loadAirlineName(id: number) {
    console.log('Called..' + id);
  }

  book(id: number) {
    this.router.navigate(['/booking', { id: id }]);
  }
}

interface search {
  from: string;
  to: string;
}

interface AirlineDetails {
  airlineId: number;
  arrival: Date;
  businessSeats: number;
  departure: Date;
  from: string;
  id: number;
  meal: string;
  nonBusinessSeats: number;
  scheduledDays: string;
  ticketPrice: number;
  to: string;
}
